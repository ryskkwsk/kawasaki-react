import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { logout } from "../../actions/authAction";
import { removeToastMessage } from "../../actions/messageAction";
import * as itemAction from "../../actions/itemAction";

import login from "../../images/login.jpg";
import loading from "../../images/loading.svg";

import MainContents from "../templates/MainContents.js";
import Header from "../organisms/Header.js";
import ItemCardList from "../organisms/Item/ItemCardList.js";
import ItemListHeader from "../organisms/Item/ItemListHeader.js";
import DeleteDialog from "../molecules/Dialog/DeleteDialog";
import withStyles from "@material-ui/core/es/styles/withStyles";
import withWidth from "@material-ui/core/es/withWidth";
import styles from "../../styles/itemListPage";
import ItemFormDialog from "../organisms/Item/ItemFormDialog.js";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ToastMessage from "../molecules/ToastMessage.js";

/**
 * Reduxのstateをpropsに展開する
 */
function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    item: state.item,
    message: state.message
  };
}

/**
 * Reduxのactionをpropsに展開する
 */
function mapDispatchToProps(dispatch) {
  return {
    itemAction: bindActionCreators(itemAction, dispatch),
    removeToastMessage: bindActionCreators(removeToastMessage, dispatch),
    logout: bindActionCreators(logout, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}

/**
 * 商品ページ
 */
class ItemListPage extends React.Component {
  componentDidMount() {
    this.props.itemAction.fetchItems(this.props.accessToken);
  }

  /**
   * ロゴクリック時の処理
   */
  handleLogoClick = () => {
    this.props.push("/");
  };

  /**
   * 検索キーワード変更時の処理
   */
  onKeywordChange = e => {
    const keyword = e.target.value;
    this.props.itemAction.setSearchKeyword(keyword);
  };

  /**
   * 商品タイトル変更時の処理
   */
  handleTitleChange = e => {
    let itemForm = this.props.item.itemForm;
    itemForm.title = e.target.value;
    this.props.itemAction.setItemForm(itemForm);
  };

  /**
   * 商品説明変更時の処理
   */
  handleDescriptionChange = e => {
    let itemForm = this.props.item.itemForm;
    itemForm.description = e.target.value;
    this.props.itemAction.setItemForm(itemForm);
  };

  /**
   * 商品価格変更時の処理
   */
  handlePriceChange = e => {
    let itemForm = this.props.item.itemForm;
    // 全角から半角に変換
    const price = e.target.value
      .replace(/[[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
    // 末尾から3桁毎にカンマを挿入(上限を9,999,999に設定)
    const formatPrice =
      price.length > 7 ? "9,999,999" : Number(price).toLocaleString();
    // フォームの値とStoreの値を変更
    itemForm.price = formatPrice;
    this.props.itemAction.setItemForm(itemForm);
  };

  /**
   * 商品画像変更時の処理
   */
  handleImageChange = e => {
    let itemForm = this.props.item.itemForm
    if (e.target.files && e.target.files[0]) {
      // 画像を選択した場合
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        itemForm.image = reader.result;
        itemForm.imageFile = file;
        this.props.itemAction.setItemForm(itemForm);
      };

      reader.readAsDataURL(file);
    } else {
      // 画像を選択しなかった場合
      this.props.itemAction.setItemForm(itemForm);
    }
  };

  /**
   * 登録・更新ボタン押下時の処理
   */
  async handleFormSubmit() {
    await this.props.itemAction.submitItemForm(
      this.props.accessToken,
      this.props.item.itemForm
    );
  }

  /**
   * 商品画像削除ボタン押下時の処理
   */
  handleDeleteImage = id => {
    this.props.itemAction.deleteItemImage(id);
  };

  /**
   * 商品メニューアイコン押下時の処理
   */
  handleMenuOpen = (e, id) => {
    this.props.itemAction.showItemMenu(e.currentTarget, id);
  };

  /**
   * トーストメッセージを表示する
   */
  renderToastMessage = style =>
    this.props.message.toastMessages.map((message, index) => (
      <div key={index}>
        {this.props.message.errorFlg ? (
          <ToastMessage
            style={style}
            className={this.props.classes.toastMessage}
            message={message}
            closeComponent={<CloseIcon />}
            onClose={this.props.removeToastMessage.bind(this, index)}
          />
        ) : (
          <ToastMessage
            className={this.props.classes.toastMessage}
            message={message}
            closeComponent={<CloseIcon />}
            onClose={this.props.removeToastMessage.bind(this, index)}
          />
        )}
      </div>
    ));

  /**
   * 商品リストor商品登録フォームを表示する
   */
  renderContents = () => {
    const { classes } = this.props;
    const { width } = this.props;

    return (
      <div>
        <ItemFormDialog
          classes={classes}
          open={this.props.item.showForm}
          fullWidth={true}
          maxWidth={width === "sm" ? "sm" : "md"}
          titleText={this.props.item.formTitle}
          disagreeText="キャンセル"
          agreeText={this.props.item.formTitle}
          handleClose={this.props.itemAction.hideItemForm}
          handleSubmit={this.handleFormSubmit.bind(this)}
          item={this.props.item.itemForm}
          formErrors={this.props.item.itemFormErrors}
          handleTitleChange={this.handleTitleChange}
          handleDescriptionChange={this.handleDescriptionChange}
          handlePriceChange={this.handlePriceChange}
          handleImageChange={this.handleImageChange.bind(this)}
          handleDeleteImage={this.handleDeleteImage}
          loading={this.props.item.loading}
        />
        <ItemListHeader
          classes={classes}
          searchKeyword={this.props.item.searchKeyword}
          placeholder="検索ワード"
          onChange={this.onKeywordChange}
          searchItem={this.props.itemAction.searchItems.bind(
            null,
            this.props.accessToken,
            this.props.item.searchKeyword
          )}
          searchText="検索"
          createOnClick={this.props.itemAction.showCreateForm.bind(
            null,
            "登録"
          )}
          createText="新規作成"
        />
        {this.props.item.loading ? (
          <div className={classes.loading}>
            <img src={loading} alt="ローディング" width={100} />
            <Typography color="primary" variant="h6">
              LOADING
            </Typography>
          </div>
        ) : (
          <ItemCardList
            classes={classes}
            items={this.props.item.items}
            handleUpdateItem={this.props.itemAction.showUpdateForm}
            handleDeleteItem={this.props.itemAction.showDeleteDialog}
          />
        )}
      </div>
    );
  };

  render = () => {
    const { classes } = this.props;
    const { width } = this.props;
    const style = {
      backgroundColor: "red",
      color: "white"
    };

    return (
      <MainContents
        header={
          <header>
            <Header
              classes={classes}
              display={width}
              menuId="headerMenu"
              anchor=""
              image={login}
              alt="ロゴ"
              width="400px"
              handleImageClick={this.handleLogoClick}
              variant="outlined"
              color="inherit"
              onClick={this.props.logout}
              text="ログアウト"
            />
          </header>
        }
        main={
          <main className={classes.main}>
            {this.renderToastMessage(style)}
            {this.renderContents()}
            <DeleteDialog
              classes={classes}
              showDialog={this.props.item.showDeleteDialog}
              handleClose={this.props.itemAction.hideDeleteDialog}
              handleDelete={this.props.itemAction.deleteItem.bind(
                null,
                this.props.accessToken,
                this.props.item.deleteItemId
              )}
              titleText="商品を削除してもよろしいですか?"
              contentText="削除した商品を元に戻すことはできません。"
              disagreeText="キャンセル"
              agreeText="削除"
            />
          </main>
        }
      />
    );
  };
}

export default withWidth()(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemListPage))
);
