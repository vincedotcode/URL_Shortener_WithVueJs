<template>
    <Spinner v-if="loading" />
    <div class="flex justify-center items-center">
        <img src="../assets/logo_main.png" alt="vincedotcode" class="w-28 py-3">
    </div>

    <div class="container mx-auto">
        <div class="flex justify-center">


            <div class="w-full max-w-md px-3">
                <!-- <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert" v-show="error">
                    <span class="font-medium">Alert!</span> This link is invalid, please input a proper link!
                </div>
                <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                    role="alert" v-show="success">
                    <span class="font-medium">Success!</span> Link is valid, please wait!
                </div> -->

                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " v-show="stateMain">
                    <div class="mb-4">
                        <h1 class="text-2xl font-bold text-center text-gray-700">URL Shortener</h1>
                        <p class="text-center text-gray-600">Enter a URL and we'll shorten it for you.</p>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="url">
                            URL
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="url" type="text" placeholder="https://www.google.com" v-model="url">
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            @click="shorten">
                            Shorten
                        </button>
                    </div>
                </div>
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" v-show="stateResult">
                    <div class="mb-4">
                        <h1 class="text-2xl font-bold text-center text-gray-700">URL Shortener</h1>
                        <p class="text-center text-gray-600">Here's Your Result : </p>
                    </div>
                    <div class="mb-4">

                    </div>
                    <div class="flex items-center justify-between">
                        <a class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            :href="result" target="_blank">
                            {{ result }}
                        </a>
                    </div>
                    <div class="flex items-center justify-between mt-4 px-10">
                        <button
                            class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            @click="back">
                            Back
                        </button>
                        <button
                            class="bg-teal-700 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            @click="copyText">
                            Copy
                        </button>
                    </div>
                    <div class="p-4 mt-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert" v-show="copied">
                        <span class="font-medium">Link has been copied</span>
                    </div>
                </div>
            </div>
        </div>
    </div>





</template>




<script>

import Spinner from './Spinner.vue';

export default {
    name: "Main",
    data() {
        return {
            url: "",
            result: "",
            stateMain: true,
            stateResult: false,
            loading: false,
            copied: false,
        };
    },
    methods: {
        start() {
            this.loading = true;
        },
        stop() {
            this.loading = false;
        },
        shorten: function () {
            this.start();
            setTimeout(() => {
            this.stop();
            }, 1000);
            const encodedParams = new URLSearchParams();
            encodedParams.append("url", this.url);
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-RapidAPI-Key": "2f2c40750bmshb883650768a7dcap195a4ajsn1969f6e68df8",
                    "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com"
                },
                body: encodedParams
            };
            fetch("https://url-shortener-service.p.rapidapi.com/shorten", options)
                .then(response => response.json())
                .then(response => this.result = response.result_url)
                .then(() => this.stateMain = false)
                .then(() => this.stateResult = true)
                .catch(err => console.error(err));
        },
        back: function () {
            this.stateMain = true;
            this.stateResult = false;
        },
        copyText: function () {
            var copyText = this.result;
            navigator.clipboard.writeText(copyText);
            this.copied = true;
            setTimeout(() => {
             this.copied = false;
            }, 3000);
           
        },
    },
    components: { Spinner }
}



</script>