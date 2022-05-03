<template>
	<view class="container">
		<view class="content-section">
			<view class="section-header">
				<view class="title">热 门 推 荐</view>
				<view class="subtitle">YOU MAY ALSO LIKE</view>
			</view>
		</view>
		
		<!-- 猜你喜欢 begin -->
		<view class="you-may-also-like">
			<!-- url="/pages/mart/detail" -->
			<!-- <navigator class="product" v-for="(product, index) in mart" :key="index" open-type="navigate" hover-class="none" url="/pages/mart/detail"> -->
			<view class="product" v-for="(product, index) in mart" :key="index" hover-class="none">
				<navigator url="/pages/mart/detail">
					<image :src="product.thumbnail" mode="widthFix"></image>
				</navigator>
				<view class="info">
					<navigator class="desc" url="/pages/mart/detail">
						<view class="name">{{ product.name }}</view>
						<view class="sub">{{ product.itemSalesVolume }}人已购买</view>
					</navigator>
					<view class="extra">
						<view class="price">￥{{ product.salePrice / 100 }}</view>
						<actions :materials-btn="!product.is_single"
								:number="productCartNum(product.id)"
								@add="handleAddToCart(product)" 
								@minus="handleMinusFromCart(product)" />
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 end -->
		
		<nomore text="已经到底了,去其他页面逛逛吧" visible></nomore>
		<!-- 商品详情 modal begin -->
		<product-modal :product="product" 
						:visible="productModalVisible" 
						@cancel="closeProductDetailModal" 
						@add-to-cart="handleAddToCartInModal" 
		/>
		<!-- 商品详情 modal end -->
		<!-- 购物车栏 begin -->
		<cart-bar :cart="cart" 
				  @add="handleAddToCart" 
				  @minus="handleMinusFromCart"
				  @clear="clearCart"
				  @pay="pay"
		/>
	</view>
	
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import Actions from './components/actions/actions.vue'
	import nomore from '@/components/nomore/nomore.vue'
	import CartBar from './components/cartbar/cartbar.vue'
	import ProductModal from './components/product-modal/product-modal.vue'
	import cartPopup from './components/cart-popup/cart-popup.vue'
	
	export default {
		components: {
			nomore,
			Actions,
			CartBar,
			ProductModal,
			cartPopup
		},
		data() {
			return {
				categories: [],
				cart: [],
				product: {},
				currentCategoryId: 0,
				notices: [],
				ads1: [
					"/static/images/order/order_upSlip_1.jpg",
					"/static/images/order/order_upSlip_2.jpg",
					"/static/images/order/order_upSlip_3.jpg"	
				],
				productModalVisible: false,
				cartPopupShow: false,
				productsScrollTop: 0,
				mart: []
			}
		},
		async onLoad() {
			this.cart = []
			this.mart = await this.$api('mart')
		},
		computed: {
			...mapState(['orderType', 'address']),
			productCartNum() {	//计算单个商品添加到购物车的数量
			
				return id => this.cart.reduce((acc, cur) => {
					if(cur.id === id) {
							return acc += cur.number
						}
						return acc
					}, 0)
			}
		},
		methods: {
			handleAddToCart(product) {	//添加到购物车
				const index = this.cart.findIndex(item => {
					if(!product.is_single) {
						return (item.id == product.id) && (item.materials_text == product.name)
					} else {
						return item.id === product.id
					}
				})
				
				if(index > -1) {
					this.cart[index].number += (product.number || 1)
					return
				}
				this.cart.push({
					id: product.id,
					cate_id: product.id,
					name: product.name,
					price: product.salePrice / 100,
					number: product.number || 1,
					image: product.thumbnail,
					is_single: product.is_single,
					materials_text: product.name || ''
				})
			},
			handleMinusFromCart(product) { //从购物车减商品
				let index
				if(product.is_single) {
				   index = this.cart.findIndex(item => item.id == product.id)
				} else {
				   index = this.cart.findIndex(item => (item.id == product.id) && (item.materials_text == product.name))
				}
				this.cart[index].number -= 1
				if(this.cart[index].number <= 0) {
					this.cart.splice(index, 1)
				}
			},
			openCartDetailsPopup() {
				this.$refs['cartPopup'].open()
			},
			pay() {
				uni.setStorageSync('cart', this.cart)
				uni.navigateTo({
					url: '/pages/pay/pay'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: auto;
		
		/* #ifdef H5 */
		min-height: 100%;
		/* #endif */
	}
	
	.banner-swiper {
		height: 750rpx;
		
		.swier-item {
			image {
				height: 100%;
			}
		}
	}
	
	.banner-section {
		display: flex;
		background-color: #FFFFFF;
		
		image {
			width: 375rpx;
		}
	}
	
	.section-header {
		display: flex;
		align-items: baseline;
		padding: 20rpx 0;
		.title {
			font-family: 'wenyue';
			font-size: 44rpx;
			margin-right: 20rpx;
		}
		
		.subtitle {
			font-family: 'neutra';
			font-size: $font-size-sm;
			color: $text-color-assist;
		}
	}
	
	.content-section {
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}
	
	.new-arrivals {
		margin-bottom: 20rpx;
		.section-body {
			display: flex;
			flex-direction: column;
			
			image {
				width: 100%;
				margin-bottom: 10rpx;
			}
		}
	}
	
	.you-may-also-like {
		padding: 20rpx 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
		.product {
			background-color: #FFFFFF;
			width: 335rpx;
			display: flex;
			flex-direction: column;
			border-radius: $border-radius-lg;
			margin-bottom: 20rpx;
			
			image {
				width: 100%;
				border-radius: $border-radius-lg $border-radius-lg 0 0;
			}
			
			.info {
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				
				.desc {
					display: flex;
					flex-direction: column;
					
					.title {
						font-size: $font-size-lg;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-bottom: 14rpx;
					}
					
					.sub {
						font-size: $font-size-sm;
						color: $text-color-assist;
					}
				}
				
				.extra {
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.price {
						color: $color-primary;
						font-size: $font-size-lg;
						font-weight: 500 !important;
					}
					
					.action {
						image {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	@import '@/pages/index/index.scss';
</style>
