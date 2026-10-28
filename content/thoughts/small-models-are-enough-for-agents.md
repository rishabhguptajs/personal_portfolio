---
title: small models are enough for agents
date: 2026-10-28
summary: a paper says agents don't need giant models. i trained a tiny one from scratch to see how far that goes.
draft: false
---

![an agent sends every call to one big model, or sends the boring calls to small models and only the hard ones to a big model](fig:routing.svg)

i read a paper recently that says something i already half believed: agents don't need giant language models. [small language models are the future of agentic ai](https://arxiv.org/pdf/2506.02153) argues that small models are good enough for most of what an agent actually does, and a lot cheaper to run.

i'm on the small model side of this, and i'm not neutral about it. i've been training tiny models from scratch on a macbook air, so i got to test a tiny slice of the idea myself. this post is the paper, what i saw, and where i think it gets harder than it sounds.

## what the paper says

the authors, from nvidia research and georgia tech, make three claims about small models, which they roughly define as anything under 10b parameters:

- they're already powerful enough for the language work agents do
- they fit agent systems better than big models
- for most of that work they're cheaper

the reasoning is simple. an agent isn't a chatbot. most of its model calls are boring: pick a tool, fill in some arguments, return json in exactly the format the code expects. it uses a narrow slice of what a big model can do, over and over. paying for a 175b model to do that is like hiring a lawyer to staple paper.

they back it with a list of small models that punch above their size. phi-3-mini, at 3.8b parameters, is reported to compete with models like mixtral 8x7b and gpt-3.5 ([phi-3 report](https://arxiv.org/abs/2404.14219)). the xlam-2 family, from 1b to 70b, is reported to beat gpt-4o on tool-use benchmarks, with the smaller ones doing especially well in multi-turn settings ([apigen-mt](https://arxiv.org/abs/2504.03601)). on cost, the paper says serving a 7b model is 10 to 30 times cheaper than serving a 70 to 175b one.

the same story shows up outside the paper. smollm2 is a 1.7b model trained on about 11 trillion tokens, and its authors report it beats qwen2.5-1.5b and llama3.2-1b, mostly by being careful about the data ([smollm2](https://arxiv.org/abs/2502.02737)). and toolformer showed back in 2023 that a language model can teach itself to call tools from just a few examples per tool, and often rival much larger models on the way ([toolformer](https://arxiv.org/abs/2302.04761)). small models getting good at a narrow job isn't new. the paper's point is that agents are mostly made of narrow jobs.

then they give a recipe. log your agent's calls, clean the data, cluster the calls into recurring tasks, pick a small model for each cluster, and fine-tune it. repeat as you get more data. the big model stays around for the stuff that really needs it, so you end up with a mix of models instead of one giant one.

their own estimates for how much of an agent's work could move over are 40% for open operator, 60% for metagpt and 70% for cradle. it's worth being clear that these are the authors' guesses from reading each agent's code. they aren't measurements, and the paper says it's a position paper.

## what i saw

the project is called [slm](https://github.com/rishabhguptajs/slm). the question i care about is a different cost from the one in the paper. the paper counts parameters. but a transformer also keeps every token it has read in a cache, so it gets heavier and slower the longer it runs. an agent that runs for hours has a long context, so that cache hurts.

so i trained small models with fixed memory. all of them have about 13.8m parameters, which is tiny, and they all saw the same 49m tokens of text in 11 languages plus tool-call data. i trained them from scratch on one macbook air. i compared a normal transformer, a gated deltanet model ([yang, kautz and hatamizadeh](https://arxiv.org/abs/2412.06464), which builds on the mamba-2 line of work, [dao and gu](https://arxiv.org/abs/2405.21060)), and a hybrid that adds a layer i wrote called priority memory attention, which keeps a fixed bank of the most important tokens.

the hybrid came out ahead:

- bits per byte on held-out text: 1.619 against 1.642 for the transformer, and it won on all 11 languages
- tool calls fully correct: 44% against 38%
- state after 32k tokens: 1.07 mb against 805 mb, which keeps growing for the transformer
- decode speed: around 326 tokens per second at every length, where the transformer drops to 30 at 32k tokens
- energy per generated token: 24% lower

![decode speed against context length. the hybrid holds around 326 tokens per second, the transformer falls from 585 to 124 to 30](fig:speed.svg)

![tool calls fully correct: transformer 38%, gated deltanet 37%, deltanet with priority memory 44%](fig:toolcalls.svg)

i want to be careful with this. it's one seed per model. the quality gaps are about 1%, which is real in these runs but small. and 44% of tool calls fully correct is not a number you'd ship an agent on. it doesn't prove the paper right at 7b, because i never ran anything near that size. what it does show is that a tiny model can be competitive on this narrow job, and that if you look at memory and energy as well as parameter count, the case for small gets stronger.

## where it gets harder

the part that didn't work is the part agents care about most.

i kept training all three models on longer text, 2,048 tokens, where a quarter of it was planted facts: a fact early on, a question about it much later. the transformer learned to use its whole window. the fixed-memory models got worse.

![a fact planted early in 2,048 tokens and a question much later. a transformer keeps the fact in its cache, a fixed memory model drops it when the bank fills up](fig:recall.svg)

this is the problem tool calling creates. an agent has to copy a function name or an id exactly, sometimes from thousands of tokens back. fixed memory is good at the gist of things and bad at exact recall. my guess is that my memory layer has nothing telling it what it should have kept, because the eviction rule is a hard cut and a dropped token never gets blamed for being needed later. that's the next thing i'm working on, so for now it's a guess.

it's not just me. [repeat after me](https://arxiv.org/abs/2402.01032) shows that transformers beat fixed-state models at copying, and that a fixed-size state is fundamentally limited there. [zoology](https://arxiv.org/abs/2312.04927) found that most of the quality gap between attention-free models and attention comes down to recalling things from earlier in the context, and built a benchmark for it. [based](https://arxiv.org/abs/2402.18668) frames it as a tradeoff: the bigger the state, the better the recall, so you're always choosing between memory and recall.

other people have hit the same wall. a [systematic study of hybrid linear attention](https://arxiv.org/abs/2507.06457) found that recall improves steadily as you add more full attention layers, with gated deltanet hybrids working well around three linear layers to one attention layer. so small and cheap doesn't mean you can drop attention. you pay for it somewhere.

my layer is one attempt at paying less. the idea is to keep only a small bank of the tokens that matter. i'm not the first to think that way. [h2o](https://arxiv.org/abs/2306.14048) found that a small set of "heavy hitter" tokens carries most of the attention, and that you can evict the rest of a transformer's cache while keeping those plus the recent ones. [streamingllm](https://arxiv.org/abs/2309.17453) found that keeping the first few tokens as "attention sinks" lets a model run on a stream of millions of tokens. both of those are applied to models after they're already trained. mine is trained under the small memory from the start, so what it learns matches how it runs.

## what i'd do with all this

if you're building an agent, i think the paper's recipe is the right starting point, and it's cheap to try:

![the four steps: log every call, find the boring ones, try a small model and measure it, keep the big model for the hard calls](fig:recipe.svg)

the thing to watch is exact recall. if a call needs the model to copy something precisely from far back, test that first, because that's where small models fall over, and where i'm still stuck.

i don't think every agent will run on small models. i do think most of the calls inside most agents don't need a big one, and we're paying for it anyway. i'd like to find out how far that goes, and i'll write more once the recall problem is fixed or i've proved to myself that it can't be.
