# mercurius
## Getting started

You will need docker: 

For MAC and Windows users -> go to http://boot2docker.io 

You will need fig:
 
```
 curl -L https://github.com/docker/fig/releases/download/1.0.1/fig-`uname -s`-`uname -m` > /usr/local/bin/fig; chmod +x /usr/local/bin/fig
``` 

Then build the image(s):

```
fig build
```

Run the container(s):

```
fig up
```

Go to http://192.168.59.103:8080