FROM maven:3.3-jdk-8 AS hg-build
EXPOSE 51200-51299
EXPOSE 50200-50299

#ADD . /opt/maven
#WORKDIR /opt/maven/
#ENTRYPOINT ./build.sh

ADD ./hashgraph /opt/maven
WORKDIR /opt/maven/source/socketdemo
RUN mvn install

FROM hg-build
WORKDIR /opt/maven
ENTRYPOINT ["java", "-jar", "swirlds.jar"]