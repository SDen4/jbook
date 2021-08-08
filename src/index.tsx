import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  };

  useEffect(() => {startService()}, [])

  const onClickHandler = async () => {
    if(!ref.current) return;

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    });

    setCode(result.code);
  }

  return (
    <div>
      <textarea onChange={(event) => {setInput(event?.target.value)}}></textarea>
      <div>
        <button onClick={onClickHandler}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'))