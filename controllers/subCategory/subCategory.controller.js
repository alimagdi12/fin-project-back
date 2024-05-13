class SubCategoryController{
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    async addSubCategory(req, res, next){
        try {
            const { title , categoryName } = req.body;
            const newSubCategory = await this.subCategoryRepository.addSubCategory(title,categoryName);
            res.status(201).json({ message: 'Sub category created successfully', subcategory: newSubCategory });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to add sub category', error: err.message });
        }
    }

    async getCategories(req, res, next) {
        try {
            const subCategories = await this.subCategoryRepository.getSubCategories();
            res.status(200).json({ message: 'subcategories retrieved successfully', subCategories });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "failed to fetch subcategory data", err: err.message });
        }
    }

    async deleteSubCategory(req, res, next) {
        try {
            const { id } = req.params;
            const deletedSubCategory = await this.subCategoryRepository.deleteSubCategory(id);
            res.status(200).json({ message: 'subcategory deleted successfully', subCategory: deletedSubCategory });
        } catch (err) {
            console.error(err);
            res.status(501).json({msg:'failed to delete subcategory', err:err.message}) 
        }
    }
}


module.exports = SubCategoryController;