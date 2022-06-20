FROM buildkite/puppeteer:latest

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# 设置 puppeteer 的字体
COPY source-sans-pro.zip /tmp
RUN sed -i 's/deb.debian.org/mirrors.163.com/g' /etc/apt/sources.list && \
    apt update && \
    apt-get install -y dpkg wget unzip
    #fonts-droid fonts-arphic-ukai fonts-arphic-uming
RUN cd /tmp && wget http://ftp.cn.debian.org/debian/pool/main/f/fonts-noto-cjk/fonts-noto-cjk_20170601+repack1-3+deb10u1_all.deb && \
    dpkg -i fonts-noto-cjk_20170601+repack1-3+deb10u1_all.deb && \
    unzip source-sans-pro.zip && cd source-sans-pro  && mv ./OTF /usr/share/fonts/  && \
    fc-cache -f -v
# 2. https://github.com/puppeteer/puppeteer/blob/master/.ci/node10/Dockerfile.linux

RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# create app directory
WORKDIR /home/node/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

RUN npm install pm2 -g \
  && npm install \
  && npx prisma generate

COPY . .

EXPOSE 3000

# CMD ["pm2-runtime", "start", "/home/node/app/bin/www"]

