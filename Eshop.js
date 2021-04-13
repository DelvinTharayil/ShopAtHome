
var hamburger = document.querySelector("#menuM");
var navLinks = document.querySelector(".nav-links");
var links = document.querySelectorAll(".nav-links li");
var bodybackc = document.getElementsByTagName('body')[0]
var homepimg = document.querySelector("#Homepgimg")
var Cartpage = document.getElementById("Cart")
var homepimg = document.querySelector("#Homepgimg")
var menuElps = document.getElementById("menuEllipse")


hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open")
  bodybackc.classList.toggle("on")
  homepimg.classList.toggle("hide")
  Cartpage.classList.toggle("hide")
  menuElps.classList.toggle("Ellipse")

  links.forEach(link => {
    link.classList.toggle("fade")
  })
})

var cartbuttonD = document.getElementById("shopcartDV")
var showpage = document.getElementById("ImgAndCart")
var Homeimg = document.getElementById("Hplaceimg")
var showview = document.getElementById("showviewBg")
var showVos = document.getElementById("showVoutside")
var btnAnim = document.querySelector("#backbutton")
var showContent = document.getElementById("Homepgimg")
var cartContent = document.getElementById("CartItems")
var HomeBtnR = document.getElementById("HomeBtn")

function backbtnF(){
  document.getElementById("showview").innerHTML= ""
  showview.style.visibility="hidden"
  showVos.style.visibility="hidden"
  bodybackc.classList.remove("stop-scrolling")
}





fetch("data.json")
.then((response) => {
  return response.json()
})
.then((data) => {

  console.log(data)
  const goodsData = data.product

  var cartD = []


  var Navtext = document.querySelectorAll(".Htext") 
  Navtext[0].classList.add("selectedNavlink");
  Navtext.forEach((itm, i) => {
    itm.addEventListener("click", () => {
      removeSelectedNav();
      addSelectedNav(i);
    });
  });

  function removeSelectedNav() {
    Navtext.forEach((itm) => {itm.classList.remove("selectedNavlink")
})
  }
  function addSelectedNav(x) {
    Navtext[x].classList.add("selectedNavlink");
  }
function fiddingCNav() {
  var findNavClass = document.getElementsByClassName('selectedNavlink');
if (findNavClass.length === 0) {
  Navtext[0].classList.add("selectedNavlink");
    console.log("It exits ")
}
}

HomeBtnR.addEventListener('click',()=>{
  Homeimg.classList.remove("blurOut")
  showview.classList.remove("blurOut")
  Cartpage.classList.remove("fadeUp")
  cartbuttonD.classList.remove("selectedNavlink")
} )

  cartbuttonD.addEventListener("click",()=>{
    Homeimg.classList.toggle("blurOut")
    showview.classList.toggle("blurOut")
    Cartpage.classList.toggle("fadeUp")
    cartbuttonD.classList.toggle("selectedNavlink")
    removeSelectedNav()
    fiddingCNav()
    EmptyCart()
    })



  function datashow(goods) {
    return `
     <div class="show" id=${goods.id} >
      <img class="show-photo" src="${goods.photo}">
      <p class="show-Pview">VIEW</p>
      <h2 class="show-name">${goods.Name} </h2>
      <p class="show-price"><strong>Rs.</strong> ${(goods.Price)}</p>
     </div>
    `;
  }
   showContent.innerHTML = goodsData.map(datashow).join("") 



  function productinfo(Ratings) {
  return `
  ${Ratings.map(Ratinginfo => `<li>${Ratinginfo}</li>`).join("")}
  `;
  }


  var childs = showContent.querySelectorAll(".show")
    for (var indx = 0; indx < childs.length; indx++) {
        childs[indx].onclick = function() {
            for (var i = 0; i < goodsData.length; i++) {
                if (goodsData[i].id == this.id) {
                  showview.style.visibility="visible"
                  showVos.style.visibility="visible"
                  bodybackc.classList.add("stop-scrolling")
                  document.getElementById("showview").innerHTML =
                  `
                    <div class="template">
                    <span id="backbutton">⤬</span>
                      <img class="goods-photo" src="${goodsData[i].photo}">
                      <h2 class="goods-name">${goodsData[i].Name}</h2>
                      <p class="goods-price">Rs. ${(goodsData[i].Price)}</p>
                      <ul class="goods-info">${goodsData[i].info ?"<strong>Product Details</strong>"+ productinfo(goodsData[i].info) : "<strong>Product Details<br>Not Available</strong>"}
                      </ul>
                    <button type="button" class="goods-cart" id ="${goodsData[i].id}" >ADD TO CART</button>
                    </div>
                  `;

                }
              } 

              document.getElementById("backbutton").onclick = function(){  
                backbtnF()
               }

              var CartBtn =  document.querySelector(".goods-cart")
              

              for (var n = 0; n < FindStorageValue().length; n++) {
                if (FindStorageValue()[n] === CartBtn.id) {
                  CartBtn.innerText = "GO TO CART"  
                }
              }
              
              
              CartBtn.onclick = function() {

                      for (var a = 0; a < goodsData.length; a++) {
                        if (goodsData[a].id == CartBtn.id) {

                                for (var i = 0; i < FindStorageValue().length; i++) {
                                    if (FindStorageValue()[i] === CartBtn.id) {
                                       Homeimg.classList.toggle("blurOut")
                                       showview.classList.toggle("blurOut")
                                       Cartpage.classList.toggle("fadeUp")
                                       cartbuttonD.classList.toggle("selectedNavlink")
                                       removeSelectedNav()
                                       fiddingCNav()
                                        backbtnF()
                                        EmptyCart()
                                        return
                                    }
                                } 
                             
                  
                      
                      CartBtn.innerText = "GO TO CART"

                       
                       var cartpush ={...goodsData[a],amount:1}
                       cartD= [...cartD, cartpush]

                         saveCart(cartD)
                         addNum(cartD)
                         addCartItem(cartpush)
                  }
                }
              }
               

            

          }
        }
        
        function saveCart(cart) {
          localStorage.setItem("cart", JSON.stringify(cart));
        }

       function setupAPP(){
         cartD = getCart();
           addNum(cartD)
           populateCart(cartD);
        }

       function populateCart(cart) {
          cart.forEach(item => addCartItem(item));
        }

       function getCart() {
          return localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
        }
      
        function FindStorageValue() {
          var id = getCart().map(function(i) {
            return i.id;
          });
          // console.log(id)
          return id
        }



        function EmptyCart() {
          var msgEmptyCart = document.querySelector(".empty-Cart")
          var cartCalc = document.querySelector(".container")  
          if (FindStorageValue().length === 0) 
          { console.log("Array is empty!")
          console.log(cartCalc)
          msgEmptyCart.style.display="flex"
          cartCalc.style.display="none"
          msgEmptyCart.innerHTML=
          `
          <h3 class="empty-msg">Your Shopping Cart is Empty!!</h3>
          <button type="button" class="cart-shopping" >CONTINUE SHOPPING</button>
          `
          var backToShopping = document.querySelector(".cart-shopping")
          backToShopping.addEventListener("click",()=>{
            Homeimg.classList.remove("blurOut")
            showview.classList.remove("blurOut")
            Cartpage.classList.remove("fadeUp")
            cartbuttonD.classList.toggle("selectedNavlink")
            removeSelectedNav()
            fiddingCNav()
          })
          }
          else{
           console.log("Removed the msg")
           msgEmptyCart.style.display="none"
          msgEmptyCart.innerHTML = ""
          cartCalc.style.display="table"
          }
        }

       cartLogic()
          
            function  cartLogic(){
              var cartClearBtn = document.getElementById("ClearBtn")   
              cartClearBtn.addEventListener("click", clearCart)
                
              cartContent.addEventListener("click", event => {
                if (event.target.classList.contains("cart-removeBtn")) {
                  let removeItem = event.target;
                  // console.log(removeItem)
                  var Cid = removeItem.id;
                  // console.log(Cid)
                  cartContent.removeChild(removeItem.parentElement.parentElement);
                }
                removeItem(Cid)
                

                 if (event.target.classList.contains("qt-plus")) {
                  let addAmount = event.target;
                  let id = addAmount.dataset.id;
                  let tempItem = cartD.find(item => item.cartId === id);
                  tempItem.amount = tempItem.amount + 1;
                  tempItem.FullPrice = tempItem.amount * tempItem.Price
                  if (tempItem.amount <= 5) {
                    
                    addAmount.previousElementSibling.innerText = tempItem.amount;
                    addAmount.nextElementSibling.innerText = "Rs. "+tempItem.FullPrice
                    // console.log(addAmount.parentElement)
                    addAmount.parentElement.classList.add("added")
                    setTimeout(function(){ addAmount.parentElement.classList.remove("added"); },150);
                    qtBtnsFadein(addAmount,tempItem.amount)
                  }
                  else {
                    tempItem.amount = 5;
                    tempItem.FullPrice = tempItem.amount * tempItem.Price
                    // qtBtnsFadein(addAmount)
                    qtBtnsFadein(addAmount,tempItem.amount)
                  }
                  addNum(cartD)
                  saveCart(cartD)
                }
                else if (event.target.classList.contains("qt-minus")) {
                  let lowerAmount = event.target;
                  let id = lowerAmount.dataset.id;
                  let tempItem = cartD.find(item => item.cartId === id);
                  tempItem.amount = tempItem.amount - 1;
                  tempItem.FullPrice = tempItem.amount * tempItem.Price
                  if (tempItem.amount > 0) {
                    addNum(cartD)
                    saveCart(cartD)
                    lowerAmount.nextElementSibling.innerText = tempItem.amount;
                    lowerAmount.nextElementSibling.nextElementSibling.nextElementSibling.innerText = "Rs. "+tempItem.FullPrice
                    lowerAmount.parentElement.classList.add("minused")
                    setTimeout(function(){ lowerAmount.parentElement.classList.remove("minused"); },150);
                    qtBtnsFadein(lowerAmount,tempItem.amount)
                  } else {
                    tempItem.amount = 1;
                    tempItem.FullPrice = tempItem.amount * tempItem.Price
                    qtBtnsFadein(lowerAmount,tempItem.amount)
                  }
                }
                EmptyCart()

              })
              }
              // qtBtnsFadein()

              function qtBtnsFadein(addFadein,qtamount) {

                var parentElement = addFadein.parentElement.parentElement
                var imgfade = parentElement.getElementsByClassName("cart-photo")
                var removeBtnslideup = parentElement.getElementsByClassName("cart-removeBtn")
                console.log(qtamount)
                if(qtamount === 1 ){
                addFadein.classList.add("qtBtnsFade")
                imgfade[0].classList.add("imgFadeOut")
                removeBtnslideup[0].classList.add("removeslideup")
                }
                if(qtamount === 5 ){
                  addFadein.classList.add("qtBtnsFade")
                  }

                  else if(qtamount === 2 || qtamount === 4 ){
                    var findqtBtnsFade = parentElement.getElementsByClassName("qtBtnsFade")
                    // console.log(findqtBtnsFade)
                    findqtBtnsFade[0].classList.remove("qtBtnsFade")
                    imgfade[0].classList.remove("imgFadeOut")
                    removeBtnslideup[0].classList.remove("removeslideup")
                  }
              }
        
            // function qtBtnsFadeout() {}
            
            function clearCart() {
              // console.log(cartD)
              let cartItems = cartD.map(item => item.cartId)
              cartItems.forEach(cartId => removeItem(cartId))
              // console.log(cartItems)
              while (cartContent.children.length > 0) {
                cartContent.removeChild(cartContent.children[0]);
              }
              Homeimg.classList.remove("blurOut")
              showview.classList.remove("blurOut")
              Cartpage.classList.remove("fadeUp")
              cartbuttonD.classList.remove("selectedNavlink")
              removeSelectedNav()
              fiddingCNav()
            }
            function removeItem(cartId){
              cartD = cartD.filter(item => item.cartId !== cartId)
              // console.log(cartD)
              addNum(cartD)
              saveCart(cartD)
            }



            function addCartItem(item) {
              var div = document.createElement("div");
               div.classList.add("cart-things");
               div.innerHTML =
               `
                  <header>
                    <img class="cart-photo" src="${item.photo}">
        
                    <h3 class="cart-removeBtn" id="${item.cartId}" >Remove</h3>
                </header>
        
                <div class="content">
        
                  <h1 class="cart-name" >${item.Name}</h1>
                  <h2 class="cart-price">Rs.${item.Price}</h2>
                  <ul class="cart-info">${item.info ?"<strong>Product Details</strong>"+ productinfo(item.info) 
                  : "<strong>Product Details<br>Not Available</strong>"}
                      </ul>
                </div>
        
                <footer>
                
                  <span class="qt-minus" data-id=${item.cartId}>-</span>
                  <span class="qt">${item.amount}</span>
                  <span class="qt-plus" data-id=${item.cartId}>+</span>

                  <h2 class="full-price">
                  Rs. ${item.FullPrice}
                  </h2>
        
                
                </footer>
               `
               ;
               cartContent.appendChild(div)
              }

            function addNum(carttotal) {
              var totalsum = 0
              carttotal.map(item => {
                totalsum += item.Price * item.amount
              })
        
              // Clearcart(numArray)  
              // console.log(totalsum)
              document.getElementById("numTotal").innerText = totalsum

              var tax = 0
              tax = 5/100 * totalsum
              document.getElementById("TaxesTotal").innerText = tax.toFixed(2)
              var orderTotal = 0
              orderTotal = totalsum + tax
              document.getElementById("OrderTotal").innerText = orderTotal
            }
        
        showVos.onclick = function(){
          backbtnF()
          }

      //  document.addEventListener("DOMContentLoaded", () => {

        setupAPP()
      
      // });
})
.catch((err) => {

})

 
      // window.onload = function(){  
      //   setupAPP()

      //   }  