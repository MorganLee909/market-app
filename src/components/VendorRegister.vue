<template>
    <div @click="$emit('closeModal')" class="modal">
        <form @submit.prevent="submit" @click.stop>
            <h2>Create New Vendor</h2>

            <label>Name of Owner/Business*
                <input ref="name" type="text" name="name" placeholder="Name" required/>
            </label>

            <label>Email*
                <input type="email" name="email" placeholder="Email" required/>
            </label>

            <label>Password*
                <input type="password" name="pass" placeholder="Password" required/>
            </label>

            <label>Confirm Password*
                <input type="password" name="confirmPass" placeholder="Confirm Password" required/>
            </label>

            <label>Description
                <textarea name="description" rows="3" placeholder="Organization Description"></textarea>
            </label>

            <label>Address**
                <input type="text" name="address" placeholder="Address"/>
            </label>

            <label>Vendor URL***
                <input type="text" name="url" placeholder="URL"/>
            </label>

            <p>* Required</p>

            <p>** Optional. Users cannot find your business if you do not add your address. Exact address not shown unless you opt-in to display it. Vendor may update address at any time.</p>

            <p>*** Optional. A unique address for your site. For example "franks-fresh-fiddleheads" will be available at market.com/franks-fresh-fiddleheads. If none, a random ID number will be used. May contain numbers, letters and '-'</p>

            <div class="buttonContainer">
                <button class="actionButton" @click="$emit('closeModal')" type="button">Cancel</button>
                
                <input class="actionButton" type="submit" value="Create Vendor"/>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$refs.name.focus();
    },

    methods: {
        submit(e){
            if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.email.value)){
                this.$emit("banner", "error", "Invalid email address");
                return;
            }

            if(e.target.pass.value.length < 10){
                this.$emit("banner", "error", "Password must contain at least 10 characters");
                return;
            }

            if(e.target.pass.value !== e.target.confirmPass.value){
                this.$emit("banner", "error", "Your passwords do not match");
                return;
            }

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
                    address: e.target.address.value,
                    url: e.target.url.value
                })
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.$emit("banner", "error", response);
                    }else{
                        localStorage.setItem("jwt", response.jwt);
                        this.$router.push(`/${response.vendor.url}`);
                    }
                })
                .catch((err)=>{
                    this.$emit("banner", "error", "Internal error, please try refreshing page");
                });
        }
    }
}
</script>

<style scoped>
.modal{
    max-height: 100vh;
    overflow-y: auto;
}

form{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 25px;
    color: var(--textOnWhite);
    max-width: 750px;
}

h2{
    color: var(--textOnWhite);
    margin: auto;
    margin-bottom: 15px;
}

p{
    font-size: 14px;
}

input, textarea{
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

.buttonContainer input{
    margin-right: 0;
}

@media screen and (max-width: 800px){
    .modal{
        align-items: flex-start;
    }

    form{
        width: 100%;
        align-items: center;
        padding: 10px 0;
    }

    label{
        width: 90%;
    }

    p{
        margin-right: auto;
        padding-left: 10px;
    }
}

@media screen and (max-width: 500px){
    .buttonContainer{
        flex-direction: column-reverse;
        align-items: center;
        width: 90%;
    }

    .buttonContainer > *{
        width: 100%;
        margin: 15px 0;
    }
}
</style>