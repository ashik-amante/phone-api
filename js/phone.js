const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data =await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhone(phones)
}

const displayPhone = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = ''
    console.log(phones.length);
    // if more than 112 phone 
    const showallContainer = document.getElementById('showall-container');
    if(phones.length > 12){
        showallContainer.classList.remove('hidden')
    }
    else{
        showallContainer.classList.add('hidden')
    }
    // display only first 10 phone 
    phones = phones.slice(0,12)
    



    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100  shadow-xl`
        phoneCard.innerHTML = `
            <figure>
                    <img
                    src="${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-center">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        `
        phoneContainer.appendChild(phoneCard)
    })
    toggleLoading(false)
}

const handelsearchbtn = () =>{
    toggleLoading(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText)
}

const toggleLoading = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading ){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}









loadPhone()