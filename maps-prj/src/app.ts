const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = 'AIzaSyCGV43usaRzbVFiVSjY6NARbFqjpKX2zEQ'

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // TODO: send this to Google API
}

form.addEventListener('submit', searchAddressHandler);
