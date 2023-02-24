<template>
    <div>
        <div class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex- items-center justify-center px-6 py-8 mx-auto w-auto md:h-screen lg:py-0">
                <!-- <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo">
                Flowbite
            </a> -->
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form class="space-y-4 md:space-y-6" @submit.prevent="sendPost">
  
 
                            <button type="submit"
                                class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                                an account</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                    here</a>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import axios from 'axios';

export default {
    name: 'SignupView',
    components: {
    },
    data() {
        return {
            f_data_l: [],
            f_list: ['user_id', 'user_password', 'age', 'user_name', 'gender', 'current_weight', 'height', 'goal_weight', 'd_day', 'minimum_kcal'],
            f_cal_list: ['bmr', 'kcal_per_day', 'profile_path', 'setting']
        }
    },
    methods: {
        sendPost: function () {
            var port = window.location.host;
            var protocol = window.location.protocol;
            // var url = protocol + "//" + port + '/api/predict_all';
            var url =  main_url + ":" + port + '/api/session';
            console.log(url);
            axios.get(url, { withCredentials: true })
            .then(function (response) {
                // 성공 핸들링
                console.log(response);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log(error);
            })
            .then(function () {
                // 항상 실행되는 영역
            });

            
        }
    }

}
</script>
