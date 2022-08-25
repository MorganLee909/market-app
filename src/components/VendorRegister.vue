<template>
    <div @click="$emit('closeModal')" class="modal">
        <form @submit.prevent="submit" @click.stop>
            <h2>Create New Vendor</h2>

            <label>Name of Owner/Business*
                <input type="text" name="name"/>
            </label>

            <label>Email*
                <input type="email" name="email"/>
            </label>

            <label>Password*
                <input type="password" name="pass"/>
            </label>

            <label>Confirm Password*
                <input type="password" name="confirmPass"/>
            </label>

            <label>Description
                <textarea name="description" rows="10"></textarea>
            </label>

            <label>Address**
                <input type="text" name="address"/>
            </label>

            <p>* Required</p>

            <p>** Optional. Users cannot find your business if you do not add your address. Exact address not shown unless you opt-in to display it. Vendor may update address at any time.</p>

            <div class="buttonContainer">
                <button class="actionButton" @click="$emit('closeModal')" type="button">Cancel</button>
                
                <input class="actionButton" type="submit" value="Create Vendor"/>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    methods: {
        submit(e){
            fetch("http://localhost:8000/vendor", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.pass.value,
                    confirmPass: e.target.confirmPass.value,
                    description: e.target.description.value,
                    address: e.target.address.value
                })
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                    }else{
                        this.$router.push(`/vendor/${response._id}`);
                    }
                })
                .catch((err)=>{});
        }
    }
}
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 35px;
    color: var(--textOnWhite);
    max-width: 1000px;
}

h2{
    color: var(--textOnWhite);
    margin: auto;
    margin-bottom: 35px;
}

input{
    font-size: 22px;
}

.modal label{
    display: flex;
    flex-direction: column;
    color: var(--textOnWhite);
    margin: 5px 0;
}

.buttonContainer{
    display: flex;
    justify-content: flex-end;
}

.buttonContainer > button{
    color: var(--textOnWhite);
    border: 1px solid var(--textOnWhite);
    background: none;
}
</style>