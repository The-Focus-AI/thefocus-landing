---
title: Optimizing Onboarding Process
industry: Human Resources
client: HR Software Provider
year: "2025"
description: We implemented a schema-driven AI solution that could extract structured data from various financial document formats, including PDFs, spreadsheets, and presentations.
challenge: The existing onboarding process was time-consuming and error-prone because it involved a lot of manual entry from third-party PDFs that contained detailed medical benefits information
solution: We implemented a schema-driven AI solution that could extract structured data from various financial document formats, including PDFs, spreadsheets, and presentations.
results: |-
  - 78% reduction in onboarding time
  - 98% accuracy in data extraction
testimonial: This solution completely changed the way that we were able to onboard new customers, making a process that was frustrating into an almost magical experience.
testimonial_person: Chief Product Officer
testimonial_company: HR software provider
published: true
image: onboarding_wide.png
---
### Approach & Implementation

Our client, a communication platform for all the retirement and healthcare benefits, is rolling out a new system to help their customers be able to effectively communicate benefits to their employees. They provide a centralized place where everyone can go and get the latest information about a huge variety of topics.

Their onboarding process requires collecting a lot of information. Part of this is unique to the customer and their values and another part of it comes in from third party benefit providers, for example healthcare plans, that are different in different regions and with different providers. There is a limited amount of standardization in terms of the data that comes in but it's certainly the case that there is a lot of frustration in entering in all of the various rules and details of the plans that are offered.

We developed a custom schema-driven AI solution that could understand the structure of a wide range of benefit documents and be able to convert that into a standardized representation that lived in the customer's database and they were able to build an experience off of.  The system was trained to understand all of the varieties of health benefits that were offered in the U.S. health insurance systems.

The solution included:

1. AWS deployed workflow pipeline that tracked and managed job performance.
2. Schema validation that made sure the resulting data fit the constraints in the customer's existing Mongo based data store. 
3. A administrative backend system that allowed the customer to monitor and recover from any issues.
4. Full deployment and production ready software

The implementation transformed their onboarding process and taking a 15 minute process down to around 30 seconds.