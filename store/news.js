const state = ()=>({
    berita:[],
    kategori:'health'
})

const mutations = {
    fetchNews(state,params){
        state.berita = params
    },
    fetchKategori(state,params){
        state.kategori = params
    }
}

const actions = {
    fetchNews(store){
        this.$axios.get(`https://saurav.tech/NewsAPI/top-headlines/category/${store.state.kategori}/au.json`)
        .then(
            (response)=>{
                console.log(response)
                store.commit('fetchNews',response.data)
            }
        ).catch(
            (error)=>{
                console.log('Error : '+error)
            }
        )
    },
    fetchNewsMore(store){
        this.$axios.get(`https://saurav.tech/NewsAPI/top-headlines/category/${store.state.kategori}/au.json`,
        {
            params:{
                pageSize:5,
                page:5
            }
        })
        .then(
            (response)=>{
                console.log(response)
                store.commit('fetchNews',[
                    ...response.data,
                    ...store.state.berita
                ])
            }
        ).catch(
            (error)=>{
                console.log('Error : '+error)
            }
        )

    },
    updateNewsList(store,params){
        store.commit('fetchKategori',params)
        // store.dispatch('fetchNews') //Ini Bisa Juga
        this.$axios.get(`https://saurav.tech/NewsAPI/top-headlines/category/${store.state.kategori}/au.json`)
        .then(
            (response)=>{
                console.log(response)
                store.commit('fetchNews',response.data)
            }
        ).catch(
            (error)=>{
                console.log('Error : '+error)
            }
        )
    }
}

export default{
    state,mutations,actions
}