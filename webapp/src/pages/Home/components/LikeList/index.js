import React, { Component } from 'react';
import Loading from '@/components/Loading';
import LikeItem from '../LikeItem';
import styles from './style.less';

const dataSource = [
    {
      id: "p-1",
      shopId: "s-1",
      shop: "院落创意菜",
      tag: "免预约",
      picture:
        "https://p0.meituan.net/deal/e6864ed9ce87966af11d922d5ef7350532676.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0",
      product: "「5店通用」百香果（冷饮）1扎",
      currentPrice: 19.9,
      oldPrice: 48,
      saleDesc: "已售6034"
    },
    {
      id: "p-2",
      shopId: "s-2",
      shop: "正一味",
      tag: "免预约",
      picture:
        "https://p0.meituan.net/deal/4d32b2d9704fda15aeb5b4dc1d4852e2328759.jpg%40180w_180h_1e_1c_1l_80q%7Cwatermark%3D0",
      product: "[51店通用] 肥牛石锅拌饭+鸡蛋羹1份",
      currentPrice: 29,
      oldPrice: 41,
      saleDesc: "已售15500"
    },
    {
      id: "p-3",
      shopId: "s-3",
      shop: "Salud冻酸奶",
      tag: "免预约",
      picture:
        "https://p0.meituan.net/deal/b7935e03809c771e42dfa20784ca6e5228827.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0",
      product: "[28店通用] 冻酸奶（小杯）1杯",
      currentPrice: 20,
      oldPrice: 25,
      saleDesc: "已售88719"
    },
    {
      id: "p-4",
      shopId: "s-4",
      shop: "吉野家",
      tag: "免预约",
      picture:
        "https://p0.meituan.net/deal/63a28065fa6f3a7e88271d474e1a721d32912.jpg%40180w_180h_1e_1c_1l_80q%7Cwatermark%3D0",
      product: "吉汁烧鱼+中杯汽水/紫菜蛋花汤1份",
      currentPrice: 14,
      oldPrice: 23.5,
      saleDesc: "已售53548"
    },
    {
      id: "p-5",
      shopId: "s-5",
      shop: "醉面 一碗醉香的肉酱面",
      tag: "免预约",
      picture:
        "https://p1.meituan.net/deal/a5d9800b5879d596100bfa40ca631396114262.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0",
      product: "[7店通用] 单人套餐",
      currentPrice: 17.5,
      oldPrice: 20,
      saleDesc: "已售23976"
    }
  ];

class LikeList extends Component {
  constructor(props){
    super(props);
    this.state={
      data:dataSource,
      pageCount:1,
    }
    this.myRef=React.createRef();
    this.removeListener=false;
  }

  componentDidMount(){
    document.addEventListener('scroll',this.handleScroll);
  }

  componentDidUpdate(){
    if(this.state.pageCount>=3&&!this.removeListener){
      document.removeEventListener('scroll',this.handleScroll);
      this.removeListener=true;
    }
  }

  componentWillUnmount(){
    !this.removeListener && document.removeEventListener('scroll',this.handleScroll);
  }

  //处理屏幕滚动事件，实现加载更多的效果
  handleScroll=()=>{
    const scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight=document.documentElement.clientHeight;
    const likeListTop=this.myRef.current.offsetTop;
    const likeListHeight=this.myRef.current.offsetHeight;
    if(scrollTop>=likeListHeight+likeListTop-screenHeight){
      const newData=this.state.data.concat(dataSource);
      const newPageCount=this.state.pageCount+1;
      setTimeout(() => {
        this.setState({
          data:newData,
          pageCount:newPageCount
        });
      }, 1000);
    }
  }

    render() {
      const {data,pageCount}=this.state;
        return (
            <div ref={this.myRef} className={styles.likeList}>
                <div className={styles.likeList__header}>猜你喜欢</div>
                <div className={styles.likeList__list}>
                    {
                      data.map(item=>{
                            return <LikeItem key={item.id} data={item} />
                        })
                    }
                </div>
                {
                  pageCount<3 ? (
                    <Loading />
                  ) : (
                    <a className={styles.likeList__viewAll}>查看更多</a>
                  )
                }
            </div>
        );
    }
}

export default LikeList;