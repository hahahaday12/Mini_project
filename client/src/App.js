
import { useEffect, useState } from 'react'; // 인풋작업
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'html-react-parser';
import Axios from 'axios';


function App() {
  // input 작업
  const [movieContent, setMovieContent] = useState({
    title:"",
    content:""
  })

  const [viewContent , setViewContent] = useState([]);

  useEffect( ()=> {
    Axios.get('http://localhost:1000/api/get').then((response) => {
      setViewContent(response.data);
    })
  },[viewContent])


  const submitReview= () => {
    Axios.post(' http://localhost:1000/api/insert' , {
      title: movieContent.title,
      content: movieContent.content
  }).then(()=>{
      alert('완료');
    })
  };

  // 이벤트가 발생할때 이벤트의 name, value 가지고옴.
  const getValue = e => {
    const {name, value} = e.target;
    console.log(name, value);
     setMovieContent({
      ...movieContent,
      [name]: value
    })
    console.log('안녕하세요');
  };
  return (
     <div className="App">
      <h1 className='title'>BOARD</h1>
      <div className='movie-container'>
        {viewContent.map(element => 
          <div className='inner'>
            <p>{element.TITLE}</p>
          <div>
            {ReactHtmlParser(element.CONTENT)}
            </div>
          </div>
          )}
      </div>
      <div className='form-wrapper'>
        <input className="title-input" 
        type='text' 
        placeholder='제목을 써주세요💙'
        onChange={getValue}
        name='title'
        />
         <CKEditor
          editor={ClassicEditor}
          data="<p> 당신에게 오늘 어떤 일이 일어났나요?🐾</p>"
          onReady={editor => {
             console.log('Editor is ready to use!', editor);
          }}

           onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
             setMovieContent({
              ...movieContent,
              content: data
            })
            console.log(movieContent);
          }}

          onBlur={(event, editor) => {
            
          }}
          onFocus={(event, editor) => {
           
          }}
        />
      </div>
      <button className="submit-button"
      onClick={submitReview}
      >등록</button>
    </div>
  );
}

export default App;
