import { computed, ref } from 'vue';
import { Widok } from '../src/Widok';

interface Item {
	name: string;
	price: number;
}

function shopSetup() {
	const available = ref<Item[]>([
		{
			name: 'car',
			price: 23000
		},
		{
			name: 'house',
			price: 200000
		},
		{
			name: 'bike',
			price: 300
		}
	]);
	const cart = ref<Item[]>([]);
	const sending = ref<boolean>(false);

	function addToCart(addItem: Item) {
		available.value = available.value.filter(item => item.name !== addItem.name);
		cart.value = cart.value.concat(addItem);
	}

	function removeFromCart(removeItem: Item) {
		available.value.push(removeItem);
		cart.value = cart.value.filter(item => item.name !== removeItem.name);
	}

	function clearCart() {
		cart.value = [];
	}

	const totalPrice = computed(() => {
		return cart.value.reduce((total, item) => {
			total += item.price;
			return total;
		}, 0);
	});

	return {
		available,
		cart,
		sending,
		addToCart,
		removeFromCart,
		clearCart,
		totalPrice
	};
}

function shopManagement(state: ReturnType<typeof shopSetup>) {
	return {
		buy() {
			state.sending.value = true;
			state.clearCart();
			setTimeout(() => {
				state.sending.value = false;
			}, 1000);
		}
	};
}

export const useShop = Widok.defineStore('shop', shopSetup, shopManagement);
