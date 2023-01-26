




const fo = document.querySelector('form')
const input = document.querySelector('#add_name');
const message1 = document.querySelector('#m1');
const message2 = document.querySelector('#m2');
fo.addEventListener('submit', (e)=>{
    message1.textContent = 'Loading ...';
    message2.textContent = ''
    e.preventDefault();
    var i = input.value;
    console.log(input.value);
    
    const url = 'http://localhost:3000/weather?address='+input.value;
    
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
            // console.log(data.error);
            message1.textContent = data.error;
            message2.textContent = '';
            }
            else{
                // console.log(data);
                message1.textContent = data.label;
                message2.textContent = data.report;
            }
        })
    })

    fo.reset();  //since querySelector returns an object and so "input" is a reference variable so it also get erased
    console.log(i)
})