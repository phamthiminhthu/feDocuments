<template>
    <header>
        <!-- Dropdown menu -->
        <div id="userDropdown"
            class="z-10 hidden bg-gray-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div class="font-medium truncate">name@flowbite.com</div>
            </div>
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <fa :icon="['fas', 'user']" class="mr-3 w-8" />
                        Profile
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <fa :icon="['fas', 'users']" class="mr-2.5 w-8" />
                        Flowing
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <fa :icon="['fas', 'users-line']" class="mr-2.5 w-8" />
                        Follower
                    </a>
                </li>
            </ul>
            <div class="py-1">
                <a href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                    out</a>
            </div>
        </div>
        <nav class="fixed w-full bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div class="flex flex-wrap items-center justify-between p-2.5">
                <a href="#" class="flex items-center">
                    <img src="~/assets/image/logo/logo.jpg" class="w-[72px] h-auto border-2 border-slate-300 inline-block"
                        style="border-radius: 50%;">
                    <div class="landing-logo">Docskanry</div>
                </a>
                <div class="md:hidden">
                    <div data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start"
                        class="rounded-full cursor-pointer">
                        <fa :icon="['fas', 'user-tie']" class="h-auto" style="width: 24px" />
                    </div>
                </div>
                <button data-collapse-toggle="navbar-dropdown" type="button"
                    class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-dropdown" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul
                        class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
                        <li>
                            <a href="#"
                                class="landing-font-18 block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#"
                                class="landing-font-18 block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                        </li>
                        <li>
                            <a href="#"
                                class="landing-font-18 block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign
                                Out</a>
                        </li>
                        <li class="md:block hidden">
                        <div data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start"
                            class="rounded-full cursor-pointer">
                            <fa :icon="['fas', 'user-tie']" class="h-auto" style="width: 24px" />
                        </div>
                    </li>
                    <!--              <li>-->
                    <!--                <button type="button" class="landing-font-18 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login</button>-->
                    <!--              </li>-->
                    <!--              <li>-->
                    <!--                <button type="button" class="landing-font-18 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-2">Sign Up</button>-->
                    <!--              </li>-->
                </ul>
            </div>
        </div>
    </nav>
</header></template>