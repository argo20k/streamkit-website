import './App.css';
import Preview from './Preview';

import TextCSS from './styles/00-default-template.css';
console.log(TextCSS)
console.log(TextCSS.toString());


function App() {
  const test = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequatur, dolores animi ab laboriosam illum sint officiis error cumque vel perferendis, voluptatem porro obcaecati odit, doloremque excepturi omnis architecto doloribus? Illo exercitationem tempore optio eveniet non error provident velit nihil dolorem officiis tenetur sint explicabo similique, ipsum esse, aliquam quasi. Natus fugit in similique sed dignissimos magni quos hic alias, blanditiis harum itaque minus sint eligendi obcaecati quam enim nobis quasi sapiente temporibus repudiandae. Quam tempore, ratione corporis consectetur quis recusandae alias eius laudantium, itaque, voluptatem eveniet libero quia voluptas excepturi soluta. Illum pariatur accusamus veritatis quaerat recusandae nobis totam!';
  
  var css_text = 'test';
  
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
