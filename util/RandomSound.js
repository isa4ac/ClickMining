class RandomSound {

    /**
     * Returns a random key for the rock hits
     */
    static getSound() {
        return `rockHit${Math.floor(Math.random() * 5) + 1}`;
    }
}