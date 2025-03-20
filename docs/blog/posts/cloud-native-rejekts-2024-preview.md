---
authors:
  - daniel
categories:
  - Cloud Native
date: 2024-03-11T22:00:00.000+01:00
links:
  - SIG Network on Gateway API: https://gateway-api.sigs.k8s.io/
  - The Kubernetes Podcast: https://kubernetespodcast.com/
---

# Cloud-Native Rejekts EU'24 Preview

Cloud-Native Rejekts EU'24 is around the corner and I prepared my schedule. Read on to see what I'll be focusing on, and get a first impression of the predominant topics.

<!-- more -->

Paris 2024 will mark my third KubeCon, and my first time at Rejekts to go along
with it.
In order to not get completely overwhelmed by two conferences back to back, I took
a good look at the conferences' schedules over the weekend, and identified a few
talks and larger topics I will be focusing on:

- **Kubernetes Networking** and the **Gateway API**
- **Platforms built on Kubernetes**
- **Kubernetes Deep Dives**

Let's have a look at a few talks from those topics, and why I picked them.

## Kubernetes Networking and the Gateway API

At Rejekts alone, there will be three talks about the
**Kubernetes Gateway API** - people want to move on from **Kubernetes Ingress**
resources, it seems.
The Gateway API _represents the next generation of Kubernetes Ingress,
Load Balancing, and Service Mesh APIs_[^1] and aims at being generic, expressive,
and role-oriented.

[^1]: Taken from the [Introduction to Gateway API](https://gateway-api.sigs.k8s.io/) by SIG Network.

**What’s new in the Kubernetes Gateway API** ([Link](https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-paris-2024/talk/GQAGX3/))
by **Abdelfettah Sghiouar** will give an overview of the current state of
the Kubernetes Gateway API and its implementations and provide an opportunity
to get updated on the project. Abdel is one of the hosts of the
[Kubernetes Podcast from Google](https://kubernetespodcast.com/), and I like
his way of breaking down large or complex topics.

Once updated on the current state of the Gateway API, I am looking forward to
**Unlocking the Gateway: A Practical Guide from Ingress to Gateway API**
([Link](https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-paris-2024/talk/KEYQD9/)),
where **Lior Lieberman** and **Mattia Lavacca** will demonstrate how
to migrate from **Ingress** to **Gateway API** using [ingress2gateway](https://github.com/kubernetes-sigs/ingress2gateway).
Both speakers are contributors to the Gateway API project, and I think we will
be given very interesting insights about the Kubernetes Gateway API throughout
the talk.

## Platforms built on Kubernetes

The next topic I'm interested in revolves around platforms built on
Kubernetes (I go by the title of _Platform Advocate_ after all). We saw the
rise of **Internal Developer Platforms** (IDPs) over the last year(s), and
looking at conference schedules, people are still keen on building platforms!

**Choose Your Own Adventure: The Perilous Passage to Production** is an
**interactive** session about going from dev to prod on Kubernetes, presented
by **Whitney Lee** and **Viktor Farcic**, who ran a previous rendition at
KubeCon EU 2023 already ([Recording on YouTube](https://www.youtube.com/watch?v=gZdEvlW-XHY)).
I missed it back then, so I'm dead-set on making it this time!

While it's not a _platform_ the audience will be building, it's a still
a production cluster, with all the building blocks and decisions you'd
probably be faced with when assembling a platform - close enough for me.

If you are looking for a talk a bit more focused on _delivering platforms_ to clients,
**No GitOps Pain, No Platform gain: Day 2 Challenges of Managing Kubernetes
Fleets with GitOps** ([Link](https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-paris-2024/talk/KHFPCL/))
might be right up your alley. **Łukasz Piątkowski** will talk about lived
experiences with platform delivery to a multitude of clients, and the
stories you'd expect in such a setting.

## Kubernetes Deep Dives

As mentioned earlier, KubeCon 2024 will mark my third rendition, and almost exactly
two years of working with Kubernetes. It won't come as a surprise that I haven't
seen nearly all of the fancy things you can pull off with one of the largest Open-Source
projects in the world.

And that's exactly why I try to catch a few talks highlighting some of the more hidden
knobs and levers of Kubernetes which I haven't heard of before or at least haven't
used myself yet.

At Rejekts, these talks will be
**Don’t Do What Charlie Don’t Does - Avoiding Common CRD Design errors**
([Link](https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-paris-2024/talk/TWUHAU/))
by **Nick Young**,
**From Fragile to Resilient: ValidatingAdmissionPolicies Strengthen Kubernetes**
([Link](https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-paris-2024/talk/KCN3QV/))
by **Marcus Noble**, and
**The Storage Crashcourse - From CSI to Databases** ([Link](https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-paris-2024/talk/9HD3FC/))
by **Benjamin Ritter** - mainly because deploying and configuring Rook, Ceph Clusters,
and CSI snapshots in my homelab has been a humbling experience recently.

## See you at Rejekts?

This is my personal list of talks to definitely attend, and who knows where I'll
end up spontaneously over the course of the two days at Rejekts 2024.

Which talks are you going to see? If you haven't had a look at the [schedule](https://cfp.cloud-native.rejekts.io/cloud-native-rejekts-eu-paris-2024/schedule/)
yet, now's the time!
If you're attending, feel free to let me know, I'd love to have a
chat - the hallway track is the most interesting one, after all.
