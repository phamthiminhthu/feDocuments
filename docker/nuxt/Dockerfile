FROM node:16.13.2-alpine 



RUN apk update && \
  apk add --no-cache git curl && \
  curl -o- -L https://yarnpkg.com/install.sh | sh &&\
  npm install -g npm && \
  npm install -g @vue/cli && \
  npm install -g nuxt

RUN apk add python3 && \
  apk add --no-cache make g++

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

ENV HOST 0.0.0.0

WORKDIR /app