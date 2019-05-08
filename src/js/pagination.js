export const pagination = {
    list: [],
    pageList: [],
    paginationList: [],
    qtyPagList: [],
    currentPage: 1,
    numberPerPage: 3,
    numberOfPages: 1,

    getNumberOfPages() {
        return Math.ceil(pagination.list.length / pagination.numberPerPage);
    },
    makeContentList() {
        let itemsQty = document.getElementById('container');
        let items = itemsQty.children;
        this.list = [...items];
        return this.list;
    },

    loadContentList() {
        let begin = ((this.currentPage - 1) * this.numberPerPage);
        let end = begin + this.numberPerPage;
        this.pageList = this.list.slice(begin, end);
        pagination.drawList();
    },
    drawList() {
        document.getElementById('container').innerHTML = '';
        let container = document.getElementById('container');
        this.pageList.forEach((item) => {
            container.appendChild(item);
        });
    },
    makePaginationList() {
        let pageConatiner = document.createElement('span');
        for (let i = 1; i <= this.numberOfPages; i++) {
            let pageNumber = document.createElement('a');
            if (i === 1) {
                pageNumber.classList.add('current')
            }
            pageNumber.textContent = `${i}`;
            pageNumber.addEventListener('click', currentPageNumber);
            pageConatiner.appendChild(pageNumber);
        }
        this.paginationList = [...pageConatiner.children];
        return this.paginationList;
    },
    paginationCut() {
        if (this.currentPage <= 6) {
            this.qtyPagList = this.paginationList.slice(0, 10);
        } else if (this.currentPage > 6 && this.currentPage < this.paginationList.length - 4) {
            this.qtyPagList = this.paginationList.slice(this.currentPage - 6, this.currentPage + 4);
        } else if (this.currentPage >= this.paginationList.length - 4) {
            this.qtyPagList = this.paginationList.slice(-10);
        }
        pagination.drawPagination();
    },
    drawPagination() {
        let pagination = document.getElementById('pagination');
        document.getElementById('pagination').innerHTML = '';

        let first = document.createElement('a');
        let firstIcon = document.createElement('i');
        firstIcon.className = 'fas fa-1x fa-angle-double-left';
        first.appendChild(firstIcon);
        first.addEventListener('click', firstPage);
        pagination.appendChild(first);

        let prev = document.createElement('a');
        let prevIcon = document.createElement('i');
        prevIcon.className = 'fas fa-1x fa-angle-left';
        prev.appendChild(prevIcon);
        prev.addEventListener('click', previousPage);
        pagination.appendChild(prev);

        let pageConatiner = document.createElement('span');

        this.qtyPagList.forEach(item => {
            pageConatiner.appendChild(item);
        });

        pagination.appendChild(pageConatiner);

        let next = document.createElement('a');
        let nextIcon = document.createElement('i');
        nextIcon.className = 'fas fa-1x fa-angle-right';
        next.appendChild(nextIcon);
        next.addEventListener('click', nextPage);
        pagination.appendChild(next);

        let last = document.createElement('a');
        let lastIcon = document.createElement('i');
        lastIcon.className = 'fas fa-1x fa-angle-double-right';
        last.appendChild(lastIcon);
        last.addEventListener('click', lastPage);
        pagination.appendChild(last);
    },
    toggleClass() {
        this.paginationList.forEach(item => item.classList.remove('current'));
        this.qtyPagList.forEach(item => item.classList.remove('current'));
        if (this.currentPage) {
            this.paginationList[this.currentPage - 1].className = "current";
        }
    },

    loadEvents() {
        pagination.paginationCut();
        pagination.toggleClass();
        pagination.loadContentList();
    },
    load() {
        pagination.makeContentList();
        this.numberOfPages = pagination.getNumberOfPages();
        pagination.makePaginationList();
        pagination.paginationCut();
        pagination.loadContentList();
        pagination.drawList();
    }
};

function currentPageNumber(ev) {
    ev.preventDefault();
    let position = parseInt(ev.target.text);
    if (position !== pagination.currentPage) {
        pagination.currentPage = position;
        pagination.loadEvents();
    }
}

function nextPage(ev) {
    if (pagination.currentPage !== pagination.numberOfPages) {
        pagination.currentPage += 1;
        pagination.loadEvents();
    } else {
        ev.preventDefault()
    }
}

function previousPage(ev) {
    ev.preventDefault();
    if (pagination.currentPage !== 1) {
        pagination.currentPage -= 1;
        pagination.loadEvents();
    } else {
        ev.preventDefault();
    }
}

function firstPage(ev) {
    ev.preventDefault();
    if (pagination.currentPage !== 1) {
        pagination.currentPage = 1;
        pagination.loadEvents();
    }
}

function lastPage(ev) {
    ev.preventDefault();
    if (pagination.currentPage !== pagination.numberOfPages) {
        pagination.currentPage = pagination.numberOfPages;
        pagination.loadEvents();
    }
}
