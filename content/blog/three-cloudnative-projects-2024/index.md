---
cover:
  image: cover.jpg
  relative: true
  caption: Photo by Kajetan Sumila on Unsplash
description: While 2023 is coming to an end, many people are already looking forward to 2024. People share predictions for the next year, forecasting emerging technologies and trends. This year, I want to jump on the bandwagon and share what I'll be looking at in 2024.
tags:
  - cloudnative
  - kubernetes
  - ebpf
  - ai
date: 2023-12-26T18:07:14+01:00
title: 'Three Cloudnative Projects to Watch in 2024'
---

Though I'm no fortune teller, thought leader, or expert (not even a senior while we're at it), 2024 is going to be my third year in the cloudnative space. I've been working with Kubernetes and related technologies for most of this time, got certified twice, and formed my own opinion(s) regarding many things in the ecosystem.

Therefore, I want to share three projects that I think could become important to **me** in 2024.

## Leveraging AI for Kubernetes Operations

The first project I want to talk about is [k8sgpt](https://k8sgpt.ai/). With version 0.1.0 released in late March this year, it has been accepted as a [CNCF Sandbox project](https://github.com/cncf/sandbox/issues/38) on December 19th, less than 9 months later.

In what can be called  the *year of AI*, it's no surprise that a project like this has experienced such a rapid growth and adoption, though it's still impressive: 55 contributors cut 43 releases over 863 commits so far, and the project has been starred 3.7k times to date.[^1]

[^1]: As of December 26th, 2023.

{{< figure src="k8sgpt.png" title="k8sgpt analyzing a common ImagePullBackoff error." align="center" alt="A screenshot of a terminal showing k8sgpt's analyzing capabilities" >}}

The project's goal is to help operators and developers troubleshooting, securing, and optimizing their Kubernetes clusters. The project's CLI works with every CNCF-conformant Kubernetes distribution, and you can combine it with several different AI models depending on your use case, e.g. **AzureOpenAI** or **Amazon SageMaker**.

I'm definitely looking forward to putting k8sgpt through its paces in 2024 should I come across a tough problem that I can't solve on my own, and I'm quite sure I'll like what I'll see.

## No More YAML: An Alternative to Helm

Over the last two years, I deployed an awful lot of Helmcharts. Basically every project related to Kubernetes I explored had a `helm install` command in its README. While I'm not the biggest fan of YAML, I've always seen it as a necessary evil - there simply wasn't a better alternative in many cases.

This might change in 2024, though. According to its website, [Timoni](https://timoni.sh) is *a new distribution and lifecycle management tool for cloud-native applications* that aims to bring **type safety**, **code generation**, and **validation** features to our deployments.

At the core of these efforts is [CUElang](https://cuelang.org/), a language designed for exactly these use cases. It's a data definition language that allows you to define schemas and constraints for your data, and it's used to define what Timoni calls **modules**.

From modules being distributed as **OCI artifacts**, to **runtime secrets injection**, to **multi-cluster deployments**, the project already has a lot to offer. I'm looking forward to seeing how it will evolve in 2024, and I'm excited to delve deeper into its applicable use cases and features than I did over the last months.

Stay tuned for a more in-depth look at Timoni in the coming weeks!

{{< figure src="timoni.png" title="Timoni's Quickstart in Action" align="center" alt="A screenshot of a terminal showing Timoni's output of a deployment" >}}

## Cloudnative Observability with eBPF

The last project I want to mention in this post is [Tetragon](https://tetragon.io/) by [Isovalent](https://isovalent.com/), one of the initial developers of [eBPF](https://ebpf.io/). Tetragon is a **cloudnative observability platform** that leverages eBPF to provide **real-time** and **high-fidelity** visibility into your Kubernetes clusters, Docker containers, and Linux hosts.

While I've been a user of [Cilium](https://cilium.io/) here and there (who isn't?), I've never really looked into eBPF or other projects by Isovalent so far. However, Tetragon seems promising: Having been released in version 1.0.0 on November 1st this year, it's a stable solution to track **process executions**, **network connections**, and **system calls** in your infrastructure - in real-time.

Observability isn't the end of the road, though. Tetragon also allows you to **enforce** policies and **block** malicious activity in your infrastructure through CRDs called `TracingPolicies`.

{{< figure src="tetragon.png" title="Tetragon tracks command executions and results in real-time" align="center" alt="A screenshot of a terminal showing Tetragon's tracing capabilities" >}}

For those of you who got curious about Tetragon, I recommend checking out one of the many available **free** labs by Isovalent, e.g. [Getting Started with Tetragon](https://isovalent.com/labs/security-observability-with-ebpf-and-cilium-tetragon/) - they're great, get you up and running in no time, *and* you will get a badge upon completion!

## Let 2024 Come - I'm Ready!

While I'll probably be drowning in bookmarks, tabs, and starred GitHub repositories by the end of January, I'm looking forward to exploring the projects above in 2024. Stay tuned for more in-depth posts on some of the projects and their respective features over the course of 2024, or go ahead and try them out yourself!