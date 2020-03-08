import React from "react";

/**
 * 404ページ
 */
const NotFound = location =>(
  <div className="flexRowCenter">
  <h3>
    お探しのページ"<code>{location.pathname}</code>"は見つかりませんでした:
  </h3>
</div>
);

export default NotFound;