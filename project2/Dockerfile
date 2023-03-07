FROM alpine:latest

LABEL "name"="project2"

COPY dist /tmp/dist

CMD cd /opt/project \
  && rm -rf `ls /tmp/dist/modules` \
  && cp -r /tmp/dist/modules/* /opt/project \
  && rm -rf /opt/project/proj2 \
  && cp -r /tmp/dist/portal /opt/project/proj2 \
  && rm -rf /tmp/dist
