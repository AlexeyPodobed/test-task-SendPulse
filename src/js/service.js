const arr = [
    { id: 1, classBg: 'facebook-block', email: '@abhisek.daas', folowers: 1.701, newFolow: 4, 
    socialIcon: '#facebook-color', type: 'FOLLOWERS', folowersUp: '#trend-up', 
    ava: "images/ava157497792916c5979f39b4d56712cc8cd.png", socialType: 'Facebook'  }, 

    { id: 2, classBg: 'twitter-block', email: '@wholetthedasout', folowers: 1.567, newFolow: 3, 
    socialIcon: '#twitter-color', type: 'FOLLOWERS', folowersUp: '#page-down', 
    ava: "images/ava26231904c4c6e9e45e6f626baeb411b8b.png", socialType: 'Twitter'  }, 

    { id: 3, classBg: 'inst-block', email: '@wholetthedasout', folowers: 1.139, newFolow: 11, 
    socialIcon: '#trend-up', type: 'FOLLOWERS', folowersUp: '#trend-up', 
    ava: "images/ava32edb976c25bcbbaf726fd5f3b91d0dcc.png", socialType: 'Facebook'  }, 

    { id: 4, classBg: 'lin-block', email: '@abhisekd3', folowers: 2.106, newFolow: 39, 
    socialIcon: '#linkedIn-color', type: 'FOLLOWERS', folowersUp: '#trend-up', 
    ava: "images/ava157497792916c5979f39b4d56712cc8cd.png", socialType: 'LinkedIn'  }, 

    { id: 5, classBg: 'yotube-block', email: '@TheAbhisekD', folowers: 8.754, newFolow: '+'+ 22, 
    socialIcon: '#youtube-color', type: 'Snap Score', folowersUp: '#trend-up', 
    ava: "images/ava40b4dce548058bf4e5525b81c47c25115.png", socialType: 'Snapchat'  }, 

    { id: 6, classBg: 'snap-block', email: '@abhisekd', folowers: 1.701, newFolow: '', 
    socialIcon: '#snap-svg', type: 'FOLLOWERS', folowersUp: '', 
    ava: "images/ava32edb976c25bcbbaf726fd5f3b91d0dcc.png", socialType: 'Facebook'  }, 

    { id: 7, classBg: 'google-block', email: '@+AbhisekDas', folowers: 1.033, newFolow: '', 
    socialIcon: '#googlePlus-color', type: 'FOLLOWERS', 
    ava: "images/ava157497792916c5979f39b4d56712cc8cd.png", socialType: 'Google+'  }, 

    { id: 8, classBg: 'vine-block', email: '@1316139228245221376', folowers: 1.045, newFolow: '', 
    socialIcon: '#vine-color', type: 'Loops', folowersUp: '', 
    ava: "images/ava5735baa04cd0f49855d9be1d97ab76705.png", socialType: 'Vine'  }, 
    ];


function createPost(data) {
    return `
    <div class="content-block-wrap">
    <div class="content-block ${data.classBg}">
      <svg class="svg">
        <use xlink:href="${data.socialIcon}"></use>
      </svg>
      <div>
        <h2>${data.folowers}</h2>
        <p>${data.type}</p>
      </div>
      <span>
        <p>${data.newFolow}</p>
        <svg class="svg">
          <use xlink:href="${data.folowersUp}"></use>
        </svg>
      </span>
    </div>
    <div class="content-profile ">
        <img src="${data.ava}" alt="img">
        <div>
            <p>${data.socialType}</p>
            <a href="#">${data.email}</a>
        </div>
    </div>
  </div>
  `
}

function addToElem(elem, data) {
    const elemInDom = document.querySelector(elem);
    if (!elemInDom) {
        console.error('No such target element')
        return;
    };
    data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = createPost(item);
        elemInDom.append(div);
    })
}

addToElem('#content-blocks', arr);