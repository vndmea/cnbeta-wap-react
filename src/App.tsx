import { useState, useEffect } from "react";
import { API_URL } from "./constants";
import InfiniteScroll from "react-infinite-scroll-component";

interface Article {
  aid: string;
  text: string;
}

const useArticle = (page: number): [boolean, boolean, Article[]] => {
  const [init, setInit] = useState(true);
  const [url, setUrl] = useState(API_URL);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        const data: Article[] = [...articles, ...result.data];

        // 去除重复id文章
        const uniqArticles = data.filter((item, index) => {
          return data.findIndex((i) => i.aid === item.aid) === index;
        });

        setArticles(uniqArticles);
        setLoading(false);
        setInit(false);
        setUrl(API_URL + "?page=" + page);
      });
  }, [page]);

  return [loading, init, articles];
};

function App() {
  const [page, setPage] = useState(2);
  const [loading, init, articles] = useArticle(page);

  return (
    <div className="App">
      {loading ? (
        <div className="page-loading-warp">
          <div className="ant-spin ant-spin-lg ant-spin-spinning">
            <span className="ant-spin-dot ant-spin-dot-spin">
              <i className="ant-spin-dot-item"></i>
              <i className="ant-spin-dot-item"></i>
              <i className="ant-spin-dot-item"></i>
              <i className="ant-spin-dot-item"></i>
            </span>
            <div>拼命加载中...</div>
          </div>
        </div>
      ) : (
        ""
      )}

      {
        <ul>
          <InfiniteScroll
            dataLength={articles.length}
            next={() => {
              !init && setPage(page + 1);
            }}
            hasMore={true}
            loader={null}
          >
            {articles.map((item) => {
              return (
                <li key={item.aid}>
                  <a href={`${API_URL}wap/view/${item.aid}.htm`}>{item.text}</a>
                </li>
              );
            })}
          </InfiniteScroll>
        </ul>
      }
    </div>
  );
}

export default App;
