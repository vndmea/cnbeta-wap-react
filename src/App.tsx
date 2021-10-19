import { useState, useEffect } from "react";
import { API_URL } from "./constants";

interface Article {
  aid: string;
  text: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Article[]>([]);

  const fetchData = async () => {
    const result = await fetch(API_URL).then((res) => res.json());
    const data: Article[] = result.data;
    const arr = data.filter((item, index) => {
      return data.findIndex((i) => i.aid === item.aid) === index;
    });
    setList(arr);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          </div>
        </div>
      ) : (
        ""
      )}

      {list.length ? (
        <ul>
          {list.map((item) => {
            return (
              <li key={item.aid}>
                <a href={`/wap/view/${item.aid}.htm`}>{item.text}</a>
              </li>
            );
          })}
        </ul>
      ) : (
        "暂无数据"
      )}
    </div>
  );
}

export default App;
