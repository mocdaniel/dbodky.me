---
author: daniel
pubDate: 2026-01-14T20:30:00.000+01:00
readTime: 5
tags:
  - cloud native
  - homelab
  - kubernetes
title: "Reviving the Homelab Part 1: Architecture"
excerpt: "After nearly two years, it's time to have mercy with the Raspberry Pi running all(!) my selfhosted workloads. In 2026, I will bring back my beloved Kubernetes-backed homelab!"
---

If you've read my 'recent' [blog post on Traefik](/blog/host-on-subpath-with-traefik), you might remember this line:

> One of my goals for 2024 is to get my homelab back up and running.

Well, we're in 2026 now, and not much has changed: The majority of applications I'm selfhosting still runs on two Raspberry Pi 4Bs (one for 'infrastructure stuff' and one for apps) with 4 CPUs and 8GB memory each.<br/>
Outages are (very) rare, and even though the Raspis are noisier than I'd like them to be due to them running quite hot because of their PoE hats, it's still bearable.

So, at this point, I might as well ask myself:

## Why Do I Want to Run Kubernetes at Home?

To answer this question, ~just look at your LinkedIn feed~, let's recap some of the perceived strengths of Kubernetes:

Kubernetes in 2026, though a **container orchestrator** by definition, is basically a _platform for building platforms_ (Kelsey Hightower, 2017 on Twitter). This is mainly due to Kubernetes' set of (mostly) stable APIs and its reconciliation loop ensuring that the expressed desired state gets enforced.

Those two traits allowed engineers to write _their own_ reconciliation loops called **operators** _on top_ of Kubernetes. There exist operators for basically anything: PostgreSQL databases ([CloudNative PG](https://cloudnative-pg.io)) and Ceph clusters ([Rook](https://rook.io)), TLS certificates ([cert-manager](https://cert-manager.io)) and virtual machines ([KubeVirt](https://kubevirt.io/)). And all of them are powered by Kubernetes' APIs and `CustomResources`.

To me, this is a huge argument in favor of Kubernetes in my homelab: A unified interface for managing, updating, and troubleshooting whatever I'm selfhosting. What's more, since it's all just YAML at its core, I can manage _the entirety_ of it using _GitOps_ - another IT practice I came to like over the last few years.

In addition, there's of course the fact that learning in public is hardly ever a bad thing, that Kubernetes is at the core of what I'm doing professionally as well, and that it might help me with finally blogging more regularly again.

All in all, that's good enough for me, so let's get to the more interesting part.

## What Are the Ingredients?

Or in other words: _How much of the [CNCF landscape](https://landscape.cncf.io) can I cram into a few SBCs?_<br> - Spoiler: a lot!<br>
First, however, let's talk about the hardware I have available for this project, as well as the operating system and cluster underneath it all.

### Hardware: SBCs Everywhere

Over the past 5 years or so, I've become a huge fan of Single Board Computers (SBCs): A (very) small energy footprint combined with increasingly powerful, ARM-based chips make for a silent, cost-efficient, and small-sized homelab.

I managed to pick up a [Turing Pi carrier board](https://turingpi.com/product/turing-pi-2-5/) along with 4 max-spec [Turing RK1 SBCs](https://turingpi.com/product/turing-rk1/?attribute_ram=16+GB) at a good price a while ago, which gives me **32 CPUs** and **128GB memory** to work with. Paired with a **1TB NVMe SSD** each, this is more than enough for my Kubernetes shenanigans.

The four SBCs are connected through a 1Gbps onboard switch, and powered by a single external PSU via the carrier board. The whole cluster fits comfortably into an mATX case on my desk.

### Operating System: Talos Minimalism

On the OS level, I go with [Talos](https://talos.dev). It's a Linux distribution tailormade for deploying Kubernetes, and it fits my prerequisites nicely:

- Immutable (dual-disk image scheme with support for rollbacks)
- Declarative (via YAML-based configuration and an API)
- Minimal (<50 unique binaries shipped)
- Compatible (official images for my SBCs' chip + architecture)

Since I've got four nodes, I am running Kubernetes with a highly available controlplane consisting of 3 nodes to ensure availability of the Kubernetes API even in case of shutdowns, updates, or hardware failures of one of the nodes.

The controlplane nodes are configured in a way that allows me to schedule workloads on them just like on traditional worker nodes, so that I can still utilize all of my nodes' resources.

All of this Kubernetes-level configuration is also done via Talos' configuration. Part 2 of this blog series will be mainly about how to configure Talos and which settings I am running my cluster on, so if this sounds interesting to you - stay tuned!

### eBPF-Based Networking with Cilium

Kubernetes needs a Container Network Interface (CNI) plugin to run properly. These plugins are the software that implements the Kubernetes network model, so that your pods can actually talk to each other (and more).

For my homelab, I am going with [Cilium](https://cilium.io) for a multitude of reasons. It's the established standard for many managed Kubernetes offerings, stable and well adopted, and based on eBPF, which promises great performance and features other CNI plugins might not offer.

Some of these features are a perfect match for homelab environments: **L2 load balancing**, **clusterwide** and **node-level** `NetworkPolicies`, and no requirement to have kube-proxy running in my cluster are just a few features that make Cilium a great choice for homelabs, where every tool you _don't_ have to deploy helps with saving precious resources.

By now, the infrastructure layer is taking shape, but one important piece of the puzzle is still missing: **storage**.

### Rook: Ceph gone Kubernetes

For storage, I am going with a tool I already mentioned in the beginning of this article: [Rook](https://rook.io). On its website, the project describes itself like this:

> Production ready management for File, Block and Object Storage

An all-in-one solution for whatever kind of storage I might need? Neat!

Rook, at its core, is a Kubernetes operator for [Ceph](https://ceph.io), a distributed storage system. Ceph itself is quite complex, and I'm definitely not an expert on the subject, but my hope is that Rook handles day-to-day operations for me, and that I'll be able to _learn on the job_.

Until then, due to Kubernetes' reconciliation powers, I will rely on Rook to do the heavy lifting for me, and will make sure to regularly backup _everything_. 😉

## Where to Go From Here?

Hardware, OS, Kubernetes architechture, networking, and storage - I'd say the initial vision of my homelab's Kubernetes environment is complete for now.

Of course, there are still some pieces missing for it to be an actual _platform for building platforms_, e.g. engines for **GitOps** and **policies**, but that will have to wait until a future post in this series.

> [!TIP]
> If you want to know more about the _whats_ and _whys_ regarding my homelab, feel free to check out its documentation at [homelab.dbodky.me](https://homelab.dbodky.me).
>
> In addition to technical documentation of my homelab you can also find a **glossary** of cloud-native terms there, in case something in my articles
> piques your interest!

If you liked what you just read, keep an eye on this blog, or follow me on any of my socials, where I'll announce future parts of this series. As mentioned above, part 2 will be about deploying and configuring **Talos**, along with **Cilium**.

_See you there!_