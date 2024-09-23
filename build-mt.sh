git rev-parse HEAD > public/revision.txt
docker build . --rm --no-cache -f mt.Dockerfile -t tracardi/tracardi-mt-gui:1.1.x
docker push tracardi/tracardi-mt-gui:1.1.x
