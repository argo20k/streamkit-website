import './App.css';
import Preview from './Preview';


 // eslint-disable-next-line import/no-webpack-loader-syntax
import css_text from '!!css-loader?{"sourceMap":false,"exportType":"string"}!./styles/00-default-template.css';



function App() {
  
  // var css_text = 'test';
  
  return (
    <div className="App">
      <header className="App-header">
				<div className="result_area">
					<div className="result_css">
						<textarea name="result_css" readOnly value={css_text}></textarea>
					</div>
					<div className="result_preview">
            <Preview />
					</div>
				</div>




      </header>
    </div>
  );
}

export default App;
