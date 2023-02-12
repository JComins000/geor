window.onload = () => {
    const calendarButtons = document.getElementsByClassName("calendarButton") as HTMLCollectionOf<HTMLButtonElement>;
    const dogDayHandler = new DogDayHandler();
    for (const element of calendarButtons) {
        element.addEventListener("click", (ev: Event) => {
            const target = ev.target as HTMLButtonElement
            const changeDate = target.getAttribute("changeDate")
            if (changeDate === null) {
                alert('oops')
            } else {
                dogDayHandler.changeDate(+changeDate)
            }
        })
    };

    dogDayHandler.renderDate()
};

const allDogs = ["georgie", "miso", "tuckie", "chungus", "big chungas"]
function seedRandom(seed: number): number {
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
}

class DogDayHandler {
    static dateElement = document.getElementById("date") as HTMLElement;
    static jDogElement = document.getElementById("jdogs") as HTMLElement;
    static lDogElement = document.getElementById("ldogs") as HTMLElement;

    static today = new Date();
    static dogDay: Date = new Date(DogDayHandler.today.getFullYear(), DogDayHandler.today.getMonth(), DogDayHandler.today.getDate());

    public renderDate() {
        DogDayHandler.dateElement.innerHTML = DogDayHandler.dogDay.toDateString()
        var seed = DogDayHandler.dogDay.getTime()
        const jList : string[] = [], lList : string[] = []
        for (const dog of allDogs) {
            (seedRandom(seed++) > .5 ? jList : lList).push(dog)
        }
        DogDayHandler.jDogElement.innerHTML = String(jList)
        DogDayHandler.lDogElement.innerHTML = String(lList)
    }
    
    public changeDate(dateIncrement: number) {
        console.log("inc", dateIncrement)
        console.log("before", DogDayHandler.dogDay.getDate())
        DogDayHandler.dogDay.setDate(DogDayHandler.dogDay.getDate() + dateIncrement)
        console.log("after", DogDayHandler.dogDay.getDate())
        this.renderDate()
    }
}
