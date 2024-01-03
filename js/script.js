
var siteArr=[] ;
var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl')
var site

if(localStorage.getItem('list')!==null)
{
    siteArr = JSON.parse(localStorage.getItem('list'))

    display()
}
function createSite(){
    if(validationName() == true && validationUrl() ==true )
    {
       
        site = {sName:siteName.value,
                sUrl:siteUrl.value}
          
        siteArr.push(site);
        localStorage.setItem('list',JSON.stringify(siteArr))
        clearForm()
        display()
        checkvalidclass(siteUrl)
        checkvalidclass(siteName)
    
    }
    else 
    {
        var fixedbox = document.getElementById('fixed-box')
        fixedbox.classList.replace('d-none','d-flex')

    }
    

    

}
function closewarning(){
    var fixedbox = document.getElementById('fixed-box')
    fixedbox.classList.replace('d-flex','d-none')

}
var searchText = document.getElementById('txtSearch')
function searchSite()
{
    deleteAll()

  var searchKey = searchText.value;
  console.log(searchKey)
  if(searchKey!=="")
  {
    trs=``;
    var found =false;
    for(var i=0;i<siteArr.length;i++)
    {
        if(siteArr[i].sName.includes(searchKey))
        {
            found =true
            trs+=`<tr>
            <td class="text-center">${i+1}</td>
            <td class="text-center">${siteArr[i].sName}</td>
          
            <td class="text-center">
                  <button class="btn btn-success btn-sm " onclick="visitSite(${i})">
                      <span>
                          <i class="fa fa-eye"></i>
                      </span>
                      visit</button>
              </td>
              <td class="text-center">
                  <button class="btn btn-danger btn-sm" onclick="deleteFrom(${i})">
                      <span><i class="fa fa-trash-can"></i></span> Delete</button>
              </td>
            </tr>`
            
    
        }
    }
    document.getElementById('tableBody').innerHTML = trs;
    if(found==false)
    {
        

    }

  }
  else
  {
    display()
  }
   

}
function display()
{
    trs=``;
    for(var i = 0 ; i<siteArr.length;i++)
    {
        trs+=`<tr>
        <td class="text-center">${i+1}</td>
        <td class="text-center">${siteArr[i].sName}</td>
      
        <td class="text-center">
              <button class="btn btn-success btn-sm " onclick="visitSite(${i})">
                  <span>
                      <i class="fa fa-eye"></i>
                  </span>
                  visit</button>
          </td>
          <td class="text-center">
              <button class="btn btn-danger btn-sm" onclick="deleteFrom(${i})">
                  <span><i class="fa fa-trash-can"></i></span> Delete</button>
          </td>
        </tr>`
        

    }
    document.getElementById('tableBody').innerHTML = trs;
}
function clearForm()
{
    siteName.value="";
    siteUrl.value = "";
}

function deleteFrom(index)
{
  siteArr.splice(index,1);
  localStorage.setItem('list',JSON.stringify(siteArr))
  display()
}
function deleteAll()
{
    document.getElementById('tableBody').innerHTML = ``;


}

function visitSite(index)
{
    // console.log(siteArr[index].sUrl)
url = siteArr[index].sUrl;
    if (!url.match(/^https?:\/\//i) ||!url.match(/^http?:\/\//i) ) {
        url = 'http://' + url;
    }
   window.open(url,'_blank')
}

function checkvalidclass(inputText)
{
    if(inputText.classList.contains('is-valid')==true)
    {
        inputText.classList.remove('is-valid')
    }
    if(inputText.classList.contains('is-invalid')==true)
    {
        inputText.classList.remove('is-invalid')
    }
}
function validationName()
{

// الفلاديشن مختلف عن الاسيمنت لاني شايفه انه المفروض يقبل الspecial charachter  دول عادي
    var snameRegex = /^[\w+( +\w+)*$]{3,}$/
    
    
    
    checkvalidclass(siteName)
  if(siteName.value !== '')
  {
    if(snameRegex.test(siteName.value) == true)
    {
        siteName.style.border.color = 'green';
       
        
        siteName.classList.add('is-valid')
        
        return true
        
    }
    else
    {
        siteName.style.border.color = 'red';
        
        siteName.classList.add('is-invalid')
        return false
     
    }
    return false;
  }
    
}

function validationUrl()
{
    checkvalidclass(siteUrl)
    var surlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
   if(siteUrl.value !=="")
   {
    if(surlRegex.test(siteUrl.value) == true)
    {
        siteUrl.style.border.color = 'green';
        siteUrl.classList.add('is-valid')
        return true
    }
    else
    {
        siteUrl.style.border.color = 'red';
        siteUrl.classList.add('is-invalid')
        return false;
     
    }
    return false;
}
    

}

