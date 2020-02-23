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
$ nodebrew install-binary {version}

# 使用バージョンを指定
$ nodebrew use {version}
```

#### ・yarnのインストール
```
# npm 経由でyarnをインストール
$ npm install -g yarn
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

#### ・サーバー側のアプリケーションを起動する
```
# MySqlを起動する
$ mysql.server start

# GitHubでのOAuth認証でログインを行う必要があるため、サーバー側のアプリケーションを起動してください。
```

### ディレクトリ構成
```
kawasaki-react
├── documents //コンポーネント図、データフロー図等
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── Auth.js
│   ├── Token.js
│   ├── actions
│   │   ├── authAction.js
│   │   ├── itemAction.js
│   │   └── messageAction.js
│   ├── components
│   │   ├── atoms
│   │   │   ├── Button.js
│   │   │   ├── IconButton.js
│   │   │   ├── Image.js
│   │   │   ├── InputFile.js
│   │   │   └── TextField.js
│   │   ├── molecules
│   │   │   ├── Card
│   │   │   │   └── ItemCard.js
│   │   │   ├── Dialog
│   │   │   │   └── DeleteDialog.js
│   │   │   ├── Form
│   │   │   │   ├── ItemForm.js
│   │   │   │   └── SearchForm.js
│   │   │   └── ToastMessage.js
│   │   ├── organisms
│   │   │   ├── Header.js
│   │   │   └── Item
│   │   │       ├── ItemCardList.js
│   │   │       ├── ItemFormDialog.js
│   │   │       └── ItemListHeader.js
│   │   ├── pages
│   │   │   ├── ItemListPage.js
│   │   │   └── LoginPage.js
│   │   └── templates
│   │       ├── MainContents.js
│   │       └── LoginContent.js
│   ├── config
│   │   ├── actionType.js
│   │   ├── store.js
│   │   └── theme.js
│   ├── images
│   │   ├── loading.svg
│   │   ├── login.jpg
│   │   └── none.png
│   ├── index.css
│   ├── index.js
│   ├── reducers
│   │   ├── authReducer.js
│   │   ├── index.js
│   │   ├── itemReducer.js
│   │   └── messageReducer.js
│   ├── serviceWorker.js
│   └── styles
│       ├── itemListPage.js
│       └── loginPage.js
└── yarn.lock
```

