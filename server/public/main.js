var app = new Vue({
    el: "#app",
    data: {
        newPostTitle: "New Journal",
        textFieldData: "",
        pastJournals: [],
        isShowingEntry: false,
        isHidingEntry: true,
        isAddingWishList: false,
        wishList: [],
        quoteOfDay: []
    },
    methods: {
        showJournalEntry: function (event) {
            if(event.srcElement.name === "addJournalButton") {
                this.newPostTitle = "New Journal";
                this.isAddingWishList = false;
            }else if(event.srcElement.name === "addWishList") {
                this.newPostTitle = "New Wish-List";
                this.isAddingWishList = true;
            }

            this.isShowingEntry = true;
            this.isHidingEntry = false;
        },
        hideJournalEntry: function () {
            this.isHidingEntry = true;
            this.isShowingEntry = false;
        },
        updateJournals: function () {
            if(this.textFieldData !== "" && !this.isAddingWishList) {
                const date = new Date();
                const dateString = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();

                var newEntry = {
                    entry: this.textFieldData,
                    date: dateString
                };
                this.pastJournals.unshift(newEntry);
            } else if (this.textFieldData !== "" && this.isAddingWishList) {
                var newEntry = {
                    item: this.textFieldData,
                    done: false
                };
                this.wishList.unshift(newEntry);

            }
            this.textFieldData = "";
        },
        deleteCheckedWishes: function () {
            var newList = [];

            for(var i = 0; i < this.wishList.length; i++) {
                if(this.wishList[i].done == false) {
                    newList.push(this.wishList[i]);
                }
            }

            this.wishList = newList;
        }
    }
});

var loadedQuotes = [];
const quoteRequest = new XMLHttpRequest();
quoteRequest.open("GET", "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=3");
quoteRequest.setRequestHeader("X-Mashape-Key", "3gtrMj4smYmshgTK0ZynVBck1oIXp15HXJsjsnQqPYpWYAfJtK");
quoteRequest.timeout = 5000;
quoteRequest.setRequestHeader("Accept", "application/json");
quoteRequest.onload = function () {
    if(quoteRequest.status === 200) {
        const quoteRes = JSON.parse(quoteRequest.responseText);
        loadedQuotes = [];
        app.quoteOfDay = loadedQuotes;

        for(var i = 0; i < quoteRes.length; i++) {
            const defaultQuote = {
                quote: quoteRes[i].quote,
                author: quoteRes[i].author
            };

            loadedQuotes.push(defaultQuote);
        }

        app.quoteOfDay = loadedQuotes
    }
}
quoteRequest.ontimeout = function () {
    const defaultQuote = {
        quote: "When your internet is slow, quotes don't load",
        author: "Someone smart"
    };

    loadedQuotes = [];
    loadedQuotes.push(defaultQuote);
}
quoteRequest.send();