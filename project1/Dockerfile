FROM alpine:latest

LABEL "name"="project1"

COPY dist /tmp/dist

CMD cd /opt/project \
  && rm -rf `ls /tmp/dist/modules` \
  && cp -r /tmp/dist/modules/* /opt/project \
  && rm -rf /opt/project/proj1 \
  && cp -r /tmp/dist/portal /opt/project/proj1 \
  && rm -rf /tmp/dist
