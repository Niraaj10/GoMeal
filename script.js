const FoodItems = [
    { id: 1, name: 'Biryani', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 2, name: 'Burger', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 3, name: 'Chiken', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 4, name: 'Paratha', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 5, name: 'Pizza', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 6, name: 'North Indian', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 7, name: 'Lassi', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 8, name: 'Ice Cream', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 9, name: 'Chhole Bhature', imageL: 'assets/img/kaajuKari.avif', price: '199' },
    { id: 10, name: 'Roll', imageL: 'assets/img/kaajuKari.avif', price: '199' },

]



// Load food Card in Food Container (foodcont)
function renderCards(FoodItems) {
    const foodContainer = document.getElementById('foodContainer');


    FoodItems.forEach(item => {
        const foodCard = document.createElement('div');
        foodCard.className = "foodCard itemCont";
        foodCard.innerHTML = `<img src="${item.imageL}" alt="" class="itemImg foodImg">
        <h2 class="itemName">${item.name}</h2>
        <div class="itemBuy">
            <button class="ATCb">Add To Cart</button>
            <div class="itemPrice">₹.${item.price}</div>
        </div>`;

        foodContainer.appendChild(foodCard);
    });
}

renderCards(FoodItems);




// Image Slider 
const imgCont = [...document.querySelectorAll('.imgCont')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];


imgCont.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})
// 




// Scroll down
document.getElementById('downBtn').addEventListener('click', () => {
    // window.scrollBy(0, 750);
    scrollToTop();
    function scrollToTop() {
        window.scrollTo({
            top: 750,
            behavior: 'smooth' // Smooth scroll animation
        });
    }
})





//Search/Filter
function SearchCards(FoodItems) {
    const foodContainer = document.getElementById('filteredItemsContainer');
    foodContainer.innerHTML = '';


    FoodItems.forEach(item => {
        const foodCard = document.createElement('div');
        foodCard.className = "foodCard itemCont";
        foodCard.innerHTML = `<img src="${item.imageL}" alt="" class="itemImg foodImg">
        <h2 class="itemName">${item.name}</h2>
        <div class="itemBuy" >
            <button class="ATCb" id='ATCb'>Add To Cart</button>
            <div class="itemPrice" id="ItemCont">₹.${item.price}</div>
        </div>`;

        foodContainer.appendChild(foodCard);
    });





}

//Search/Filter
function searchItems(search) {
    return FoodItems.filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()));
}

//Search/Filter
document.getElementById('searchBar').addEventListener('keyup', function () {
    const Search = this.value;
    const searchInput = document.getElementById('searchBar')
    // const value = searchInput.value
    // console.log(value);

    console.log(Search);


    const searched_Items = searchItems(Search);
    console.log(searched_Items);

    if (!Search) {
        document.getElementById('filteredItemsContainer').style.display = "none";
    } else {
        document.getElementById('filteredItemsContainer').style.display = "flex";
        SearchCards(searched_Items);

    }
});




//on click on Order btn
document.getElementById('cartCont').style.display = "none"
document.getElementById('OCBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (document.getElementById('cartCont').style.display == "none") {
        
        window.scroll(0,0);
        // scrollToTop();
        document.getElementById('cartCont').style.display = 'flex';
        document.getElementById('body').style.overflow = 'hidden';
    } else {
        document.getElementById('body').style.overflow = '';
        document.getElementById('cartCont').style.display = 'none';
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'none' // Smooth scroll animation
        });
    }
});


// Cart
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const subTotalPrice = document.getElementById('SubTotal');
    const gstPrice = document.getElementById('gstPrice');
    const GTotalPrice = document.getElementById('GTotal');
    let subTotalPricee = 0;


    document.querySelectorAll('.ATCb').forEach(btn => {
        btn.addEventListener('click', () => {
            const Itemm = btn.parentElement.parentElement;
            // console.log(Itemm);            
            const ItemImg = Itemm.querySelector('.itemImg').src;///////////////////////////////////////
            const ItemName = Itemm.querySelector('.itemName').textContent;
            const ItemPrice = parseFloat(Itemm.querySelector('.itemPrice').textContent.slice(2, 6));




            const ItemList = document.createElement('div');
            ItemList.className = 'CartItemCont';
            ItemList.innerHTML = `<img src="${ItemImg}" alt="" class="CartitemImg">
        
            <h2 class="CartitemName" id="ItemName">${ItemName}</h2>
            <div class="CartitemBuy">
                <div class="itemPrice" id="ItemPrice">₹ ${ItemPrice}.00</div>
                <div class="buttoncontainer">
                    <button id="decreaseBtn" class="INbtn"><img src="assets/SVG/minus.svg" alt=""></button>
                    <span id="counter" class="counter">1</span>
                    <button id="increaseBtn" class="INbtn"><img src="assets/SVG/plus.svg" alt=""></button>
                </div>
            </div>`;

            console.log(cartItems);
            cartItems.appendChild(ItemList);


            // Update the price 
            subTotalPricee += ItemPrice;
            console.log(subTotalPricee);
            
            const totalGst = subTotalPricee * 0.05;
            const totalPrice = subTotalPricee + totalGst

            subTotalPrice.textContent = subTotalPricee.toFixed(2);
            gstPrice.textContent = totalGst.toFixed(2);
            GTotalPrice.textContent = totalPrice.toFixed(2);


        })
    });
});

