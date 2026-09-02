# DevOps Learning Project

A hands-on DevOps learning project built around a simple MERN-style application.

The application itself is intentionally simple. The goal of this project was to understand the **DevOps workflow from source code to automated deployment** rather than build a complex application.

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,github,githubactions,nodejs,express,docker,ubuntu,azure,linux,jest" alt="Tech Stack Icons" />
  </a>
</p>

---

## <img src="https://api.iconify.design/lucide:rocket.svg?color=%230284c7" width="22" height="22" /> What This Project Demonstrates

- Git and GitHub
- Meaningful incremental commits
- GitHub Actions
- Continuous Integration (CI)
- Continuous Deployment (CD)
- Node.js and Express
- Docker
- Docker images and containers
- Docker Hub as a container registry
- Linux / Ubuntu
- SSH
- Azure Virtual Machine
- Azure Network Security Groups
- Automated deployment to a VM
- Container restart policies
- Container logs and runtime verification

---

## <img src="https://api.iconify.design/lucide:workflow.svg?color=%236366f1" width="22" height="22" /> Architecture

```text
                         DEVELOPER
                             │
                             │ git push
                             ▼
                      ┌─────────────┐
                      │   GitHub    │
                      │ Source Code │
                      └──────┬──────┘
                             │
                             ▼
                   ┌──────────────────┐
                   │  GitHub Actions  │
                   │                  │
                   │ • Install deps   │
                   │ • Run tests      │
                   │ • Build images   │
                   │ • Push images    │
                   │ • Deploy         │
                   └────────┬─────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  Docker Hub  │
                    │              │
                    │ backend img  │
                    │ frontend img │
                    └──────┬───────┘
                           │
                       docker pull
                           │
                           ▼
                    ┌──────────────┐
                    │   Azure VM   │
                    │ Ubuntu Linux │
                    └──────┬───────┘
                           │
                         Docker
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
          ┌──────────────┐   ┌──────────────┐
          │   Backend    │   │   Frontend   │
          │   :8080      │   │   :3000      │
          └──────────────┘   └──────────────┘
                  │                 │
                  └────────┬────────┘
                           ▼
                         Users
```

---

## <img src="https://api.iconify.design/lucide:folder-tree.svg?color=%23eab308" width="22" height="22" /> Project Structure

```text
devops_learning_project/
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── server.test.js
├── frontend/
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── docker-compose.yml
└── .github/
    └── workflows/
        └── ci.yml
```

The repository also contains an `img/` directory used by this README for project screenshots.

![Project structure](img/project_structure.png)

---

## <img src="https://api.iconify.design/lucide:boxes.svg?color=%23f97316" width="22" height="22" /> Technologies Used

<p align="left">
  <img src="https://skillicons.dev/icons?i=git,github,githubactions,nodejs,express,docker,ubuntu,azure,linux,jest" alt="Tech Stack" />
</p>

| Technology | Purpose |
| :--- | :--- |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) | Version control |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) | Source-code repository |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white) | CI/CD automation |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Application runtime |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Backend and frontend HTTP servers |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) | Containerization |
| ![Docker Hub](https://img.shields.io/badge/Docker_Hub-2496ED?style=flat&logo=docker&logoColor=white) | Container image registry |
| ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=flat&logo=ubuntu&logoColor=white) | VM operating system |
| ![Azure VM](https://img.shields.io/badge/Azure_VM-0078D4?style=flat&logo=microsoftazure&logoColor=white) | Application runtime/server |
| ![SSH](https://img.shields.io/badge/SSH-000000?style=flat&logo=gnubash&logoColor=white) | Secure remote access and deployment |
| ![Azure NSG](https://img.shields.io/badge/Azure_NSG-0078D4?style=flat&logo=microsoftazure&logoColor=white) | Network access control |

---

## <img src="https://api.iconify.design/lucide:refresh-cw.svg?color=%2306b6d4" width="22" height="22" /> CI/CD Pipeline

The central objective of the project was to understand what happens after:

```bash
git push origin main
```

The workflow is:

```text
Code Change
    │
    ▼
git push origin main
    │
    ▼
GitHub
    │
    ▼
GitHub Actions Runner
    │
    ├── Checkout repository
    ├── Setup Node.js
    ├── Install dependencies
    ├── Run backend tests
    ├── Build backend Docker image
    ├── Build frontend Docker image
    ├── Login to Docker Hub
    ├── Push Docker images
    ├── Setup SSH
    └── Deploy to Azure VM
              │
              ▼
        Azure VM pulls images
              │
              ▼
        Old containers removed
              │
              ▼
        New containers started
              │
              ▼
          Application live
```

---

## <img src="https://api.iconify.design/lucide:flask-conical.svg?color=%2310b981" width="22" height="22" /> Continuous Integration

GitHub Actions runs the CI part on a temporary Ubuntu runner.

It:

1. Checks out the repository.
2. Installs Node.js.
3. Installs backend dependencies.
4. Installs frontend dependencies.
5. Runs the backend health-check test.
6. Builds both Docker images.

If the tests or Docker builds fail, the deployment should not proceed.

### The important concept I learned

**GitHub Actions provides temporary compute for testing and building the application.**

It is not the server where my application continuously runs.

---

## <img src="https://api.iconify.design/simple-icons:docker.svg?color=%232496ED" width="22" height="22" /> Docker

Docker packages the applications into container images.

The basic flow is:

```text
Source Code
     │
     ▼
 Dockerfile
     │
     ▼
 Docker Image
     │
     ▼
 Docker Container
     │
     ▼
Running Application
```

The project produces two images:

```text
rishis26/devops-backend:latest
rishis26/devops-frontend:latest
```

Docker Hub stores these images so the Azure VM can pull them during deployment.

![Docker Hub repositories](img/docker_hub.png)

---

## <img src="https://api.iconify.design/simple-icons:microsoftazure.svg?color=%230078D4" width="22" height="22" /> Azure Deployment

The application runs on an Ubuntu Linux virtual machine in Azure.

### VM

- VM: `devops-learning-vm`
- OS: Ubuntu 24.04
- Size: Standard B2ats v2
- Architecture: x64
- Region: Central India
- Docker installed and running

![Azure VM overview](img/vm_overview.png)

### Runtime compute

The **Azure VM is the persistent compute** for the application.

Unlike the temporary GitHub Actions runner, the VM stays available and runs the Docker containers.

```text
Azure VM
   │
   └── Docker
        ├── devops-backend
        │      └── Node.js application :8080
        │
        └── devops-frontend
               └── Node.js application :3000
```

---

## <img src="https://api.iconify.design/lucide:globe.svg?color=%233b82f6" width="22" height="22" /> Network Configuration

Azure Network Security Group rules were configured to allow the application ports and SSH access.

| Port | Protocol | Purpose |
| :--- | :--- | :--- |
| 22 | TCP | SSH |
| 3000 | TCP | Frontend |
| 8080 | TCP | Backend |

![Azure Network Security Group rules](img/vm_network_rules.png)

> For a real production deployment, inbound application ports should be restricted appropriately and HTTPS/reverse-proxy architecture would normally be considered. This project intentionally keeps the setup simple for learning.

---

## <img src="https://api.iconify.design/lucide:server.svg?color=%238b5cf6" width="22" height="22" /> Running Containers on the VM

After deployment, the Azure VM runs both containers:

```text
devops-backend
devops-frontend
```

with the following port mappings:

```text
8080 → backend
3000 → frontend
```

![Docker containers running on Azure VM](img/vm_docker_runtime.png)

The containers were configured with:

```bash
--restart unless-stopped
```

This means Docker will automatically restart the containers after an unexpected Docker/VM restart, unless the containers were explicitly stopped.

---

## <img src="https://api.iconify.design/lucide:scroll-text.svg?color=%2364748b" width="22" height="22" /> Container Logs

The containers can be inspected using:

```bash
docker logs devops-backend
docker logs devops-frontend
```

The backend reports:

```text
Backend running on port 8080
```

and the frontend reports:

```text
Frontend running on port 3000
```

This confirms that the applications are not merely built as images --- they are actually running inside containers on the Azure VM.

---

## <img src="https://api.iconify.design/lucide:key-round.svg?color=%23f59e0b" width="22" height="22" /> SSH and Deployment

GitHub Actions connects to the Azure VM using SSH.

The private SSH key is stored as a **GitHub Actions secret** rather than being committed to the repository.

The deployment process performed by GitHub Actions is essentially:

```bash
docker pull rishis26/devops-backend:latest
docker pull rishis26/devops-frontend:latest

docker stop devops-backend || true
docker rm devops-backend || true

docker stop devops-frontend || true
docker rm devops-frontend || true

docker run -d \
  --name devops-backend \
  --restart unless-stopped \
  -p 8080:8080 \
  rishis26/devops-backend:latest

docker run -d \
  --name devops-frontend \
  --restart unless-stopped \
  -p 3000:3000 \
  rishis26/devops-frontend:latest
```

No SSH private key, Docker Hub token, or other secret is stored in the repository.

---

## <img src="https://api.iconify.design/lucide:git-branch.svg?color=%23f43f5e" width="22" height="22" /> Git Workflow

I used small, meaningful commits throughout the project instead of making one large commit at the end.

Examples include:

```text
feat: add backend api
feat: add frontend service
feat: dockerize backend
feat: dockerize frontend
feat: add docker compose
ci: add initial github actions workflow
test: add backend health check
ci: run backend tests
ci: build backend docker image
ci: build frontend docker image
ci: push docker images to docker hub
ci: add azure ssh setup
ci: deploy application to azure vm
feat: update backend api message
```

This made it possible to see how the project evolved from a basic application into a deployed DevOps workflow.

![Git commit history](img/commit.png)

---

## <img src="https://api.iconify.design/lucide:lightbulb.svg?color=%23eab308" width="22" height="22" /> What I Understand Now

This project helped me understand the difference between several concepts that can initially look similar.

### GitHub vs Docker Hub vs Azure

**GitHub**

```text
Source code
```

**Docker Hub**

```text
Built container images
```

**Azure VM**

```text
Running application
```

### GitHub Actions vs Azure VM

The most important distinction I learned:

> **GitHub Actions uses temporary compute to test, build and deploy the application. Azure VM provides the persistent compute where the application actually runs and serves users.**

So when a user requests:

```text
http://<VM-IP>:8080
```

the request goes to:

```text
Internet
   ↓
Azure VM
   ↓
Docker
   ↓
Backend container
   ↓
Node.js / Express
   ↓
Response
```

GitHub Actions is not serving that request.

---

## <img src="https://api.iconify.design/lucide:badge-check.svg?color=%2310b981" width="22" height="22" /> End-to-End Deployment Proof

To verify that the entire pipeline actually worked, I changed the backend response from:

```text
DevOps Learning Project API
```

to:

```text
DevOps Learning Project API v2
```

After pushing the change to `main`:

```text
GitHub
   ↓
GitHub Actions
   ↓
Tests passed
   ↓
Docker images rebuilt
   ↓
Docker Hub updated
   ↓
Azure VM pulled new images
   ↓
Containers recreated
   ↓
Live API returned v2
```

![Live deployment proof](img/live_proof.png)

This was the final proof that the automated deployment was working end-to-end.

---

## <img src="https://api.iconify.design/simple-icons:github.svg?color=%23181717" width="22" height="22" /> Repository

The project source code, Git history, workflow and configuration are available in this repository:

**GitHub:** `rishis26/devops-learning-project`

![GitHub repository](img/repo.png)

---

## <img src="https://api.iconify.design/lucide:target.svg?color=%23ef4444" width="22" height="22" /> Final Learning Outcome

The purpose of this project was not to create a complex application.

The purpose was to understand the **complete DevOps delivery pipeline**:

```text
Write Code
    ↓
Git
    ↓
GitHub
    ↓
GitHub Actions
    ↓
Test
    ↓
Docker Build
    ↓
Docker Hub
    ↓
Azure VM
    ↓
Docker Containers
    ↓
Running Application
```

I can now explain where the code is tested, where Docker images are built and stored, where deployment happens, and where the application actually runs.

---

## <img src="https://api.iconify.design/lucide:pin.svg?color=%2306b6d4" width="22" height="22" /> Project Status

**Completed --- End-to-end CI/CD deployment working successfully.**
