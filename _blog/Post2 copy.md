---
title: "Learn How to Pre-render Pages Using Static Generation with Next.js kube"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2020/03/13"
author:
  name: Tim Neutkens
  picture: "/assets/blog/authors/tim.jpeg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

## basics

- Stored in JSON format, but most often written in YAML
  - K8S agents convert YAML to JSON prior to persisting
- Kubernetes written in Go
- Containers - Docker, Buildah, Podman, containerd
- K8S inspired by BORG, the system google built to manage its applications over 15 years

## components

- masters/manager central control servers
- worker nodes
- kubectl - cli tool to communicate with the K8S API
- kubelet - systemd services that recieves info on containers, downloads them and manages any necesary resources, monitors it and restarts when needed
- kube-proxy - manages local firewal rules, and network config to expose containers
- pod colletion of one or more containers making up an "app"
- control plane node

  - kube-apiserver - the api endpoint for intereacting with kubernets. All actions pass through this. aOnly thing that connects to etcd database
  - kube-scheduler - determines what node will host a pod
    -etcd Database - holds the state of the cluster, network. Is a b-tree key-value store
  - kube-controller-manager (or cloud-provider-external beta as of v1.16) control loop daemon that interacts with kube-apiserver to monitor state of cluster. if not match, this will contact necessary controller to match desired state

- Worker nodes

  - runs kubelet and kube-proxy
  - kubelet - works with the underlying container engine (docker) to make sure containers are running, configure local node until configuration changes are completed on worker nodes. Ensures access or creation to storage, secrets or ConfigMaps if needed.
  - kube-proxy - manages network conectivity. uses iptables entries. Also monitors services and endpoints using proxy.
  - No cluster-wide logging yet. Instead uses Fluentd.
  - no cluster-wide metrics. Prometheus often used for this.

- Pods

  - dont interact with containers directly, instead we work with Pods
  - pods are groups of containers
  - containers in pods are started in parallel. initContainer can be used to ensure some are started before others
  - usualy only 1 IP per pod (although alternative tools exist that allow more)
  - containers inside pod communicate using loopback, IPC, or share file system
  - side car container would existin inside same pod as app

- operators

  - watch-loops and controllers.
  - query current state, compare it to spec and do work based on how they are different

- network setup
  - container to container communication handled inside pod (loopback, ipc, share files)
  - pod to pod - k8s wont manage, k8s expects you to do it so it is available
  - pods assigned IP prior to containers start
  - clusterIP - used for trafice within the cluster
  - ingrest controller (or service mesh like istio) connects external trafic to a pod.
  - pause container - special container that hols the namespace and ip address
  - https://speakerdeck.com/thockin/illustrated-guide-to-kubernetes-networking
  - CNI config file
    - standard file used to define network interfaces for cluster.
    - can configure network of a pod - giving a pod an IP, it does not help with pod to pod communication accross nodes.
  - pod to pod networking -
    - use tools like
      - https://github.com/flannel-io/flannel#flannel
      - https://www.tigera.io/project-calico/
      - https://cilium.io/
