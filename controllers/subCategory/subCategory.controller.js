class SubCategoryController{
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    async addSubCategory(body){
        try {
            const newSubCategory = await this.subCategoryRepository.addSubCategory(body);
            return { message: 'Sub category created successfully', subcategory: newSubCategory };

        } catch (err) {
            console.error(err);
            return { message: 'Failed to add sub category', error: err.message };
        }
    }

    async getCategories() {
        try {
            const subCategories = await this.subCategoryRepository.getSubCategories();
            return { message: 'subcategories retrieved successfully', subCategories };
        } catch (err) {
            console.error(err);
            return { message: "failed to fetch subcategory data", err: err.message };
        }
    }

    async deleteSubCategory(id) {
        try {;
            const deletedSubCategory = await this.subCategoryRepository.deleteSubCategory(id);
            return { message: 'subcategory deleted successfully', subCategory: deletedSubCategory };
        } catch (err) {
            console.error(err);
            return { msg: 'failed to delete subcategory', err: err.message };
        }
    }
}


module.exports = SubCategoryController;