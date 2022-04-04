<template>
	<view class="container">
		<view class="content-section">
			<view class="section-header">
				<view class="title">猜 你 喜 欢</view>
				<view class="subtitle">YOU MAY ALSO LIKE</view>
			</view>
		</view>
		
		<!-- 猜你喜欢 begin -->
		<view class="you-may-also-like">
			<navigator class="product" v-for="(product, index) in mart" :key="index" open-type="navigate" hover-class="none" url="/pages/mart/detail">
				<image :src="product.thumbnail" mode="widthFix"></image>
				<view class="info">
					<view class="desc">
						<view class="title">{{ product.name }}</view>
						<view class="sub">{{ product.itemSalesVolume }}人已购买</view>
					</view>
					<view class="extra">
						<view class="price">￥{{ product.salePrice / 100 }}</view>
						<view class="action">
							<image src="/static/images/common/round_add_normal.png"></image>
						</view>
					</view>
				</view>
			</navigator>
		</view>
		<!-- 猜你喜欢 end -->
		
		<nomore text="已经到底了,去其他页面逛逛吧" visible></nomore>
	</view>
</template>

<script>
	import nomore from '@/components/nomore/nomore.vue'
	
	export default {
		components: {
			nomore
		},
		data() {
			return {
				mart: []
			}
		},
		async onLoad() {
			this.mart = await this.$api('mart')
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
