# amphibNames 

Batch updates of amphibian taxonomies

## Introduction

Taxonomies of amphibians are constantly being updated as new research introduces new findings, and
updates to the tree of life. Therefore, amphibNames is a tool to allow batch updating of amphibian
taxonomy strings in the form of genus-species. Each entry is looked up in (currently) two databases, and
the most recent taxonomy assigned to that organism is retrieved and written to an output file,
available for download. The databases amphibNames uses are the
[Amphibian Species of the World]("http://research.amnh.org/vz/herpetology/amphibia/"),
and [AmphibiaWeb]("https://amphibiaweb.org/").

## Getting started

### Installation from source

### Running with docker

[Docker](https://www.docker.com/what-docker) is a lightweight Linux tool which uses containers
for easy deployment. Assuming docker is set-up and installed, first pull the image:

```
docker pull kevinxchan/amphibnames
```

And then run docker:

```
docker run -d -p 3000:3000 kevinxchan/amphibnames
```

amphibNames will now be available at `localhost:3000` in your browser.

### Installation and running from source

amphibNames is a Node.js web application, and uses npm for dependency management. 
Clone this repository, and install all dependencies.

```
git clone https://github.com/kevinxchan/amphibNames.git && cd amphibNames
npm install
```

To start the application, run

```
npm start
```

If everything was installed correctly, you should see this in the terminal:
```
Server listening on port 3000
```

amphibNames is now available at `localhost:3000` in your browser.
