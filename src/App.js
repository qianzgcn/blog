import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response1, setResponse1] = useState([]);
  const [response2, setResponse2] = useState([]);

  const fetchHttp1 = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books');
      setResponse1(response.data);
    } catch (error) {
      setResponse1([{ title: 'Error fetching from HTTP/1.1' }]);
    }
  };

  const fetchHttp2 = async () => {
    try {
      const response = await axios.get('https://localhost:3002/api/books'); // 忽略自签名证书的警告
      setResponse2(response.data);
    } catch (error) {
      setResponse2([{ title: 'Error fetching from HTTP/2' }]);
    }
  };

  function test1() {
    for (let i = 1; i <= 30; i++) {
      fetchHttp1();
    }
  }

  function test2() {
    for (let i = 1; i <= 30; i++) {
      fetchHttp2();
    }
  }
  window.times = 3;

  async function test3() {
    for (let i = 1; i <= window.times; i++) {
      axios.get('http://localhost:3001/api/sleep', { params: { time: 3 } })
    }
  }
  async function test4() {
    for (let i = 1; i <= window.times; i++) {
      axios.get('https://localhost:3002/api/sleep', { params: { time: 3 } })
    }
  }

  return (
    <div className="App">
      <button onClick={test1}>Fetch from HTTP/1.1</button>
      <button onClick={test2}>Fetch from HTTP2</button>
      <button onClick={test3}>http发送请求</button>
      <button onClick={test4}>http2发送请求</button>
      <h2>HTTP/1.1 Response:</h2>
      <pre>{response1.map(item => <p>{item.title}</p>)}</pre>
      <h2>HTTP/2 Response:</h2>
      <pre>{response2.map(item => <p>{item.title}</p>)}</pre>
    </div>
  );
}

export default App;