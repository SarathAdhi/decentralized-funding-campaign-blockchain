// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Funding {
    struct Campaign {
        uint256 id;
        string ownerName;
        address owner;
        string title;
        string description;
        string image;
        uint256 targetAmount;
        uint256 collectedAmount;
        uint256 endDate;
        bool isCompleted;
        bool isCancelled;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        string memory _name,
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _targetAmount,
        uint256 _endDate
    ) public returns (Campaign memory) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            _endDate > (block.timestamp * 1000),
            "The End Date should be a date in the future."
        );

        campaign.id = numberOfCampaigns;
        campaign.ownerName = _name;
        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.image = _image;
        campaign.targetAmount = _targetAmount;
        campaign.collectedAmount = 0;
        campaign.endDate = _endDate;

        campaign.isCompleted = false;
        campaign.isCancelled = false;
        campaign.donators = new address[](0);
        campaign.donations = new uint256[](0);

        numberOfCampaigns++;

        return campaigns[numberOfCampaigns - 1];
    }

    // donate to campaign
    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        bool isCampaignCompleted = campaign.endDate < (block.timestamp * 1000);

        if (isCampaignCompleted) {
            campaign.isCompleted = true;
        }

        require(campaign.isCompleted != true, "The campaign is completed.");

        require(campaign.isCancelled != true, "The campaign is cancelled.");

        uint256 amount = msg.value;

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.collectedAmount += amount;
        }

        if (campaign.collectedAmount >= campaign.targetAmount) {
            campaign.isCompleted = true;
        }
    }

    // cancel campaign(only owner)
    function cancelCampaign(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(
            campaign.owner == msg.sender,
            "You are not the owner of the campaign."
        );

        bool isCampaignCompleted = campaign.endDate < (block.timestamp * 1000);

        if (isCampaignCompleted) {
            campaign.isCompleted = true;

            require(false, "The campaign is already over.");
        }

        require(
            campaign.isCompleted != true,
            "The campaign is already completed."
        );

        campaign.isCancelled = true;
    }

    // Get a campaign
    function getCampaign(uint256 _id) public view returns (Campaign memory) {
        return campaigns[_id];
    }

    // Get all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory _campaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            _campaigns[i] = campaigns[i];
        }

        return _campaigns;
    }
}
