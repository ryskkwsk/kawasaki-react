##  [フロントエンド課題「Reactを使ったSPAの作成」]

### 使用した技術
```
＊ Node.js 12.1(LTS)
* npm 6.4
＊ React 16.1
* Redux 4.0
* React-dom 16.1
* react-redux 7.1
* redux-promise-middleware 6.1
* react-router 5.1
* redux-logger 3.0
* redux-devtools-extension 2.1
* react-router-dom 5.1
* connected-react-router 6.6
* history 4.1
```

### 環境構築
#### ・nodebrewのインストール
```
# nodebrewのインストール
# $ brew install nodebrew

# パスを通す
export PATH=$HOME/.nodebrew/current/bin:$PATH　>> ~/.bash_profile

# 使用可能なバージョンを表示
$ nodebrew ls-remote

#最新のLTS版インストール
$ nodebrew install-binary stable

# 使用バージョンを指定
$ nodebrew use {version}
```

#### ・yarnのインストール
```
# npm 経由でyarnをインストール
$ npm install -g yarn
```

#### ・node_modulesのインストール
```
$ yarn install
```

#### ・サーバー側のアプリケーションを起動する
```
# DB(MySql)を起動する
$ mysql.server start

# GitHubでのOAuth認証でログインを行う必要があるため、サーバー側のアプリケーションを起動してください。
```

#### ・アプリケーションの起動
```
# アプリケーションをBitbucketからクローンする
$git clone git@bitbucket.org:teamlabengineering/kawasaki-react-spa.git

# ディレクトリを移動
$ cd kawasaki-react-spa

# アプリケーションをスタート
$ yarn start
```

### ディレクトリ構成
```
kawasaki-react
├── documents //コンポーネント図、データフロー図等
├── package.json
├── public
├── src
│   ├── App.css
│   ├── App.js    // 認証とルーティングを行う
│   ├── Auth.js   // 認証処理
│   ├── Token.js  // トークン取得処理
│   ├── actions   // ReduxのAction
│   ├── components
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   │   ├── pages
│   │   │   ├── ItemListPage.js  // ログインページのコンテナ
│   │   │   └── LoginPage.js     // 商品ページのコンテナ
│   │   └── templates
│   ├── config // 設定ファイル
│   ├── images // 画像を格納する
│   ├── index.css
│   ├── index.js
│   ├── reducers // ReduxのReducer
│   │   └── index.js // Reducerを1つにまとめる
│   ├── serviceWorker.js
│   └── styles // 各コンテナのスタイル
│       ├── itemListPage.js
│       └── loginPage.js
└── yarn.lock
```

