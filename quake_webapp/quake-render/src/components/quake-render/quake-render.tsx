import { Component, h, State } from '@stencil/core';
import QuakeDown from '../../utils/quake-down';

@Component({
  tag: 'quake-render',
  styleUrl: 'quake-render.css',
  shadow: true,
})
export class QuakeRender {
  @State() markdownData: any[] = [];

  componentWillLoad() {
    let content = `# [heading+](https://quake.inherd.org)
> blockquote

# h1
## h2
### h3
#### h4
##### h5
###### h6

---

123

456

| 工具          | 项目地址                          |
| ------------- | ------------------------------- |
| wrk           | [https://github.com/wg/wrk](https://github.com/wg/wrk)     |
| Apache JMeter | [https://jmeter.apache.org/](https://jmeter.apache.org/)   |

list 2

1. hello
2. world
   - dsa
   - dsaf
3. demo
   - level 2
       - **level 3**
   - level 2.1

pll:

4. zero
5. demo

some_link [[note:0001-demo]] fdas

!!! note "title"
    **something**

:Test:

\`\`\`javascript
console.log('hello, world');
\`\`\`

sample
`;

    this.markdownData = new QuakeDown(content, this.parseInline).gen();
  }

  render() {
    return <div>
      {this.markdownData.map((item: any) =>
        this.conditionRender(item),
      )}
    </div>;
  }

  private conditionRender(item: any) {
    let out: string;
    switch (item.type) {
      case 'heading':
        out = this.render_heading(item);
        break;
      case 'blockquote':
        out = <blockquote innerHTML={item.text} />;
        break;
      case 'hr':
        out = <hr />;
        break;
      case 'paragraph':
        out = <p innerHTML={item.text} />;
        break;
      case 'space':
        break;
      case 'table':
        out = this.render_table(item);
        break;
      case 'list':
        out = this.render_list(item);
        break;
      case 'admonition':
        out = <div>
          <div class='admonition-title'>{item.title}</div>
          <div class='admonition-body'>{item.data.map((sub) =>
            this.conditionRender(sub)
          )}</div>
        </div>;
        break;
      case 'code':
        out = <pre class={'language-' + item.lang}><code class={'language-' + item.lang} innerHTML={item.text} /></pre>
        break;
      default:
        // console.log(item);
        out = <span />;
    }

    return out;
  }

  private render_heading(item: any) {
    let heading: string;
    switch (item.depth) {
      case 1:
        heading = <h1 innerHTML={item.text} class='quake-heading' id={item.anchor} />;
        break;
      case 2:
        heading = <h2 innerHTML={item.text} class='quake-heading' id={item.anchor} />;
        break;
      case 3:
        heading = <h3 innerHTML={item.text} class='quake-heading' id={item.anchor} />;
        break;
      case 4:
        heading = <h4 innerHTML={item.text} class='quake-heading' id={item.anchor} />;
        break;
      case 5:
        heading = <h5 innerHTML={item.text} class='quake-heading' id={item.anchor} />;
        break;
      case 6:
        heading = <h6 innerHTML={item.text} class='quake-heading' id={item.anchor} />;
        break;
      default:
        console.log(item);
    }

    return heading;
  }

  private render_table(item: any) {
    return <table>
      <thead>
      <tr>
        {item.header.map((head) =>
          <th innerHTML={head} />,
        )}
      </tr>
      </thead>
      <tbody>
      {item.rows.map((row) =>
        <tr>
          {row.map((cell) =>
            <td innerHTML={cell} />,
          )}
        </tr>,
      )}
      </tbody>
    </table>;
  }

  private render_list(list: any) {
    if (list.ordered) {
      return <ol start={list.start}>
        {list.children.map((item) =>
          <li>
            {item.task && <input type='checkbox' checked={item.checked}/>}
            <span innerHTML={item.text}/>
            {item.children.length > 0 && item.children[0].type == 'list' &&
              this.render_list(item.children[0])
            }
          </li>,
        )}
      </ol>;
    } else {
      return <ul>
        {list.children.map((item) =>
          <li>
            {item.task && <input type='checkbox' checked={item.checked}/>}
            <span innerHTML={item.text}/>
            {item.children.length > 0 && item.children[0].type == 'list' &&
              this.render_list(item.children[0])
            }
          </li>,
        )}
      </ul>;
    }
  }

  parseInline(tokens, renderer) {
    let out = '',
      i,
      token;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];

      switch (token.type) {
        case 'escape': {
          out += renderer.text(token.text);
          break;
        }
        case 'html': {
          out += renderer.html(token.text);
          break;
        }
        case 'link': {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case 'image': {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case 'strong': {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'em': {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'codespan': {
          out += renderer.codespan(token.text);
          break;
        }
        case 'br': {
          out += renderer.br();
          break;
        }
        case 'del': {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'text': {
          out += renderer.text(token.text);
          break;
        }
        case 'page_link': {
          out += `<a href='#'>${token.raw}</a>`;
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          console.error(errMsg);
        }
      }
    }
    return out;
  }
}