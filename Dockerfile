FROM node:18.16.1-alpine 



RUN apk update && \
  apk add --no-cache git curl && \
  curl -o- -L https://yarnpkg.com/install.sh | sh &&\
  npm install -g npm && \
  npm install -g @vue/cli && \
  npm install -g nuxt && \
  npm install -g node-gyp

RUN apk add python3 && \
  apk add --no-cache make g++ cairo-dev pango-dev libpng-dev jpeg-dev giflib-dev librsvg-dev pixman-dev


ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

ENV HOST 0.0.0.0

WORKDIR /app

# COPY src ./

# RUN yarn install
# RUN yarn build
# CMD ["yarn", "start"]