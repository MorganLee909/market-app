<template>
    <form class="searchBar" @submit.prevent="search">
        <input type="text" ref="address" placeholder="ADDRESS" required/>

        <div class="distanceContainer">
            <input class="distance" type="number" min="1" step="1" ref="distance" value="25" required/>

            <select ref="unit" required>
                <option value="mi" default>Miles</option>
                <option value="km">Kilometers</option>
            </select>
        </div>
            
        <input type="submit" style="display:none"/>
    </form>
</template>

<script>
export default {
    emits: ["search"],

    mounted(){
        this.$refs.address.focus();
    },

    methods: {
        search: function(){
            this.$emit(
                "search",
                this.$refs.address.value,
                this.$refs.distance.value,
                this.$refs.unit.value
            );
        }
    }
}
</script>

<style scoped>
.searchBar{
    display: flex;
    background: white;
    padding: 15px;
    border: 2px solid var(--secondaryColor);
}

input, select{
    font-size: 24px;
    background: white;
    border: none;
    outline: none;
}

input[type="number"]{
    width: 75px;
}

.distance{
    padding-left: 10px;
}

@media screen and (max-width: 800px){
    .searchBar{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: none;
        border: none;
    }

    .searchBar > *{
        margin: 15px 0;
    }
}

@media screen and (max-width: 450px){
    input, select{
        font-size: 20px;
        height: 50px;
    }

    input[type="text"]{
        padding: 5px 10px;
        box-sizing: border-box;
    }
}
</style>